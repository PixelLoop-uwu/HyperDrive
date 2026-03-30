from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from collections.abc import AsyncGenerator
from backend.config import Config

DB_URL = f"sqlite+aiosqlite:///{str(Config.DATABASE_PATH)}"

engine = create_async_engine(DB_URL, echo=True)
SessionLocal = async_sessionmaker(bind=engine, expire_on_commit=False)

async def get_db() -> AsyncGenerator[AsyncSession, None]:
  async with SessionLocal() as session:
    yield session
