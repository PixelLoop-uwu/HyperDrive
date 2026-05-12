import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from sqlalchemy import select
from src.models.user import User
from src.dependencies.db_session import engine, get_db
from src.utils.hash import hash_something
from src.models.base import Base
from loguru import logger


async def create_root_user(email="root@localhost.dev", username="ROOT", password="root_password"):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    async for db in get_db():
        if await db.execute(select(User).where(User.email == email)):
            logger.warning("Root пользователь уже существует")
            return
        
        user = User(email=email, username=username, hashed_password=hash_something(password))
        db.add(user)
        await db.commit()
        logger.success(f"✓ Root создан: {email} / {username}")


if __name__ == "__main__":
    asyncio.run(create_root_user())
