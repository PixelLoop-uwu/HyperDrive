from loguru import logger

from src.models.base import Base
from src.dependencies.db_session import engine


async def init_db():
  async with engine.begin() as conn:
    await conn.run_sync(Base.metadata.create_all)
  logger.success("Tables created")