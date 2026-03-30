from sqlalchemy.orm import selectinload, with_loader_criteria
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, delete, update

from backend.database.bases import File, User
from backend.exceptions import *


async def create_file_record(
  session: AsyncSession, 

  id: str,
  user_id: str,
  folder_id: str | None,
  name: str,
  size: int,
  hash: str,
) -> File:
  
  new_file = File(
    id = id,
    user_id = user_id,
    folder_id = folder_id,
    name = name, 
    hash = hash,
    size = size
  )

  session.add(new_file)

  try:
    await session.commit()
  except IntegrityError:
    await session.rollback()
    raise FileAlreadyExists()
  
  return new_file


async def get_files_by_folder(
  session: AsyncSession,
  user_id: str,
  folder_id: str
) -> list[File]:
  user_exists = await session.scalar(
    select(User.id).where(User.id == user_id)
  )

  if user_exists is None:
    raise UserNotFound()

  result = await session.execute(
    select(File).where(
      File.user_id == user_id,
      File.folder_id == folder_id
    )
  )

  return result.scalars().all()


async def get_file_by_id(session: AsyncSession, user_id: str, file_id: str) -> File:
  result = await session.execute(
    select(User)
    .where(User.id == user_id)
    .options(
      selectinload(User.files),
      with_loader_criteria(File, File.id == file_id)
    )
  )

  file = result.scalar_one_or_none()

  if not file:
    raise FileNotFound()
  
  return file


