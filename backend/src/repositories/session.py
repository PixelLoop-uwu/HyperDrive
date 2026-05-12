from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from datetime import datetime, timezone

from src.dependencies.db_session import get_db
from src.models.user import UserSession
from src.exceptions import SessionNotFoundError
from src.config import config

class SessionRepository:
  def __init__(self, session: AsyncSession):
    self.session = session

  async def create_session(
    self, 
    user_id: str, 
    token_hash: str, 
    user_agent: str | None, 
    ip: str | None, 
    expires_at: datetime
  ) -> None:
    subquery = (
      select(UserSession.id)
      .where(UserSession.user_id == user_id)
      .order_by(UserSession.created_at.desc())
      .offset(config.MAX_SESSIONS - 1)
      .scalar_subquery()
    )
    await self.session.execute(
      delete(UserSession)
      .where(UserSession.id.in_(subquery))
    )

    new_session = UserSession(
      user_id=user_id,
      refresh_token_hash=token_hash,
      user_agent=user_agent,
      ip_address=ip,
      expires_at=expires_at
    )
    self.session.add(new_session)
    await self.session.flush()

  async def get_session(self, token_hash: str) -> UserSession:
    result = await self.session.execute(
      select(UserSession)
        .where(UserSession.refresh_token_hash == token_hash)
    )
    session = result.scalar_one_or_none()

    if not session:
      raise SessionNotFoundError("Refresh token not found")
    return session

  async def update_session(
    self, 
    old_token_hash: str, 
    new_token_hash: str, 
    new_expires_at: datetime
  ) -> None:
    query = (
      update(UserSession)
      .where(UserSession.refresh_token_hash == old_token_hash)
      .values(refresh_token_hash=new_token_hash, expires_at=new_expires_at)
    )
    await self.session.execute(query)
    await self.session.flush()

  async def delete_session(self, token_hash: str) -> None:
    await self.session.execute(
      delete(UserSession)
        .where(UserSession.refresh_token_hash == token_hash)
      )
    await self.session.flush()

  async def delete_all_user_sessions(self, user_id) -> None:
    await self.session.execute(
      delete(UserSession)
        .where(UserSession.user_id == user_id)
    )
    await self.session.flush()

  async def delete_expired_sessions(self) -> None:
    now = datetime.now(timezone.utc)
    await self.session.execute(
      query = delete(UserSession)
        .where(UserSession.expires_at < now)
    )
    await self.session.flush()



async def get_session_repo(
  db_session: AsyncSession = Depends(get_db)
) -> SessionRepository:
  return SessionRepository(db_session)