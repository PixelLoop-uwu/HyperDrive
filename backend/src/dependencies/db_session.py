from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from src.config import config

engine = create_async_engine(config.DATABASE_URL)
session_factory = async_sessionmaker(engine, expire_on_commit=False)


async def get_db():
  async with session_factory() as session:
    try:
      yield session
      await session.commit()
    except Exception as e:
      await session.rollback()
      raise e
    finally:
      await session.close()