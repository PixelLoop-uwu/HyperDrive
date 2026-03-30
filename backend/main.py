from fastapi import FastAPI
from loguru import logger
from sqlalchemy import select
from uuid import uuid4
import sys
import uvicorn

from backend.config import Config
from backend.database.session import engine, SessionLocal
from backend.database.bases import Base, User
from backend.utils import hash_password

from backend.routes.auth import router as auth_router


def logger_setup():
  Config.LOGS_FOLDER.mkdir(parents=True, exist_ok=True)

  logger.remove()

  logger.add(sys.stdout, 
    level="INFO", 
    colorize=True, 
    format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>"
  )

  logger.add(Config.LOGS_FOLDER / "app_{time:YYYY-MM-DD}.log", 
    level="DEBUG", 
    rotation="00:00",
    retention="7 days",
    compression="zip",
    format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {name}:{function}:{line} - {message}"
  )

async def init_db():
  async with engine.begin() as conn:
    await conn.run_sync(Base.metadata.create_all)

  async with SessionLocal() as session:
    result = await session.execute(
      select(User).where(User.username == Config.ROOT_USERNAME)
    )
    root_user = result.scalar_one_or_none()

    if not root_user:
      new_root = User(
        id=str(uuid4()),
        email=Config.ROOT_EMAIL,
        username=Config.ROOT_USERNAME,
        password_hash=hash_password(Config.ROOT_PASSWORD),
      )
      session.add(new_root)
      await session.commit()
      logger.info(f"Root user '{Config.ROOT_USERNAME}' created")
    else:
      logger.info("Root user already exists")



app = FastAPI(title="HyperDriveAPI")
app.include_router(auth_router)

@app.get("/")
def test() -> None:
  return {"status": "ok", "version": 1}

@app.on_event("startup")
async def on_startup():
  Config.DATA_FOLDER.mkdir(exist_ok=True)
  logger_setup()

  await init_db()



if __name__ == "__main__":
  uvicorn.run(
    "backend.main:app",
    host="127.0.0.1",
    port=25566,
    reload=True,
    log_level="info"
  )
  