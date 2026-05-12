from fastapi import FastAPI, APIRouter
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
import uvicorn
import asyncio

from src.routes.auth import router as auth_router

from src.config import config
from src.exceptions import AppError
from src.utils import setup_logging, init_db


app = FastAPI(title="HyperDrive API")

app.add_middleware(
  CORSMiddleware,
  allow_origins=[
    "http://localhost:3000",   # Ваш фронтенд
    "http://127.0.0.1:3000",
  ],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

api_router = APIRouter(prefix=f"/v{config.VERSION}")
api_router.include_router(auth_router)


@app.exception_handler(AppError)
async def app_error_handler(request, exc: AppError):
  logger.error(f"AppError: {exc.message}", status_code=exc.status_code)
  return JSONResponse(
    status_code=exc.status_code,
    content={"status": "error", "message": exc.message}
  )

@app.get("/")
async def available_check() -> None:
  return {"status": "AVAILABLE", "version": config.VERSION}

app.include_router(api_router)


if __name__ == "__main__":
  setup_logging()
  asyncio.run(init_db())

  logger.info(f"Starting server on {config.HOST}:{config.PORT}")
  logger.info(f"Starting HyperDrive API v{config.VERSION}")

  uvicorn.run(
    "src.main:app", host=config.HOST, port=config.PORT, reload=True
  )
