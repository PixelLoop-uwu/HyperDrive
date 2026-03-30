from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, delete, update
from datetime import datetime, timezone, timedelta

from backend.database.bases import User, RefreshToken
from backend.exceptions import *


async def register_new_user(
  session: AsyncSession, 
  username: str, 
  email: str,
  password_hash: str
):
  new_user = User(
    username = username,
    email = email,
    password_hash = password_hash
  )

  session.add(new_user)

  try:
    await session.commit()
  except IntegrityError:
    await session.rollback()
    raise UserAlreadyExists(f"Username {username} or email {email} alraedy taken")


async def search_user_with_username(session: AsyncSession, username: str) -> User:
  result = await session.execute(
    select(User)
    .where(User.username == username)
    # .options(selectinload(User.refresh_tokens))
  )
  user = result.scalar_one_or_none()
  
  if not user:
    raise UserNotFound(f"User {username} not found")
  
  return user


async def search_user_with_uid(session: AsyncSession, uid: str) -> User:
  result = await session.execute(
    select(User)
    .where(User.id == uid)
    # .options(selectinload(User.refresh_tokens))
  )
  user = result.scalar_one_or_none()
  
  if not user:
    raise UserNotFound(f"User {uid} not found")
  
  return user


async def create_refresh_token(
  session: AsyncSession, user_id: str, jti: str, life_time: int = 24
):
  expires_at = datetime.now(timezone.utc) + timedelta(days=life_time)

  token = RefreshToken(
    jti=jti, user_id=user_id, expires_at=expires_at
  )

  session.add(token)
  await session.commit()


async def search_refresh_token(session: AsyncSession, jti: str, user_id: str) -> RefreshToken:
  result = await session.execute(
    select(RefreshToken)
    .where(RefreshToken.jti == jti, RefreshToken.user_id == user_id)
  )
  token = result.scalar_one_or_none()

  if not token:
    raise RefreshTokenNotFound (f"Token {jti} not found")
  
  return token


async def revoke_token(session: AsyncSession, refresh_token: RefreshToken) -> None:
  result = await session.execute(
    update(RefreshToken)
    .where(RefreshToken.jti == refresh_token.jti)
    .values(revoked=True)
  )

  if result.rowcount == 0:
    raise RefreshTokenNotFound(f"Token {refresh_token.jti} not found")
  
  await session.commit()


async def cleanup_refresh_tokens(session: AsyncSession) -> int:
  now = datetime.now(timezone.utc)
  
  result = await session.execute( 
    delete(RefreshToken).where(
      (RefreshToken.revoked == True) | (RefreshToken.expires_at < now)
    )
  )

  await session.commit()
  return result.rowcount

