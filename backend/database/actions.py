from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, update

from backend.database.bases import File, Folder
from backend.exceptions import *


async def rename_element(
  session: AsyncSession, 
  user_id: str, 
  file_id: str, 
  new_name: str,
  model_type: type[File] | type[Folder]
):
  result = await session.execute(
    update(model_type)
    .where(model_type.id == file_id, model_type.user_id == user_id)
    .values(name=new_name)
  )

  if result.rowcount == 0:
    raise FileNotFound()
  

async def move_element(
  session: AsyncSession, 
  user_id: str, 
  file_id: str, 
  dest_folder: str | None,
  model_type: type[File] | type[Folder]
):
  result = await session.execute(
    update(model_type)
    .where(model_type.id == file_id, model_type.user_id == user_id)
    .values(folder_id=dest_folder)
  )

  if result.rowcount == 0:
    raise FileNotFound()
  

async def copy_element(
  session: AsyncSession,
  user_id: str,
  file_id: str,
  dest_folder: str | None,
  new_file_id: str,
  model_type: type[File] | type[Folder],
):
  result = await session.execute(
    select(model_type).where(
      model_type.id == file_id,
      model_type.user_id == user_id
    )
  )
  original = result.scalar_one_or_none()

  if not original:
    raise FileNotFound()

  data = {
    column.name: getattr(original, column.name)
    for column in original.__table__.columns
    if column.name != "id"
  }

  data["id"] = new_file_id
  if dest_folder is not None:          
    data["folder_id"] = dest_folder

  copy_obj = model_type(**data)

  session.add(copy_obj)
  await session.commit()

  return copy_obj