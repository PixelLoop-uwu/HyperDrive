from sqlalchemy import select, or_
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends

from src.models.user import User
from src.dependencies.db_session import get_db
from src.exceptions import UserAlreadyExistsError, UserNotFoundError


class UserRepository:
  def __init__(self, session: AsyncSession):
    self.session = session

  async def create_user(self, email: str, username: str, password_hash: str) -> None:
    try:
      new_user = User(
        email=email,
        username=username,
        hashed_password=password_hash
      )
      self.session.add(new_user)
      await self.session.flush()

    except IntegrityError as e:
      await self.session.rollback()
      err = str(e.orig).lower()
      if "email" in err:
        raise UserAlreadyExistsError("Email is already occupied")
      if "username" in err:
        raise UserAlreadyExistsError("Login is already occupied")
      raise 

  async def get_by_id(self, user_id: str) -> User:
    user = await self.session.get(User, user_id)
    if not user:
      raise UserNotFoundError("User not found")
    return user

  async def get_user_by_ident(self, identifier: str) -> User:
    result = await self.session.execute(
      select(User).where(
        or_(User.email == identifier, User.username == identifier)
    ))
    user = result.scalar_one_or_none()

    if not user:
      raise UserNotFoundError("Incorrect login or password")
    
    return user



async def get_user_repo(
  db_session: AsyncSession = Depends(get_db)
) -> UserRepository:
  return UserRepository(db_session)