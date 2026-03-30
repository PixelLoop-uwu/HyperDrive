from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, delete, update

from backend.database.bases import Folder, User
from backend.exceptions import *


async def create_folder_record(
  session: AsyncSession,
  user_id: str,

  name: str,
  id: str,
  parent_id: str | None
):
  new_folder = Folder(
    user_id=user_id,
    id=id,
    name=name,
    folder_id=parent_id
  )

  session.add(new_folder)

  try:
    await session.commit()
  except IntegrityError:
    await session.rollback()
    raise FolderAlreadyExists()


async def get_Folders_by_folder(
  session: AsyncSession,
  user_id: str,
  folder_id: str
) -> list[Folder]:
  user_exists = await session.scalar(
    select(User.id).where(User.id == user_id)
  )

  if user_exists is None:
    raise UserNotFound()

  result = await session.execute(
    select(Folder).where(
      Folder.user_id == user_id,
      Folder.folder_id == folder_id
    )
  )

  return result.scalars().all()