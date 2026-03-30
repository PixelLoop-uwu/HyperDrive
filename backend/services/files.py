from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import UploadFile
from typing import List
from uuid import uuid4
from pathlib import Path
import aiofiles
import hashlib

from backend.exceptions import *
from backend.database.auth import search_user_with_uid
from backend.database.files import *
from backend.config import Config
from backend.permission.jwt import SessionJWTPayload


async def upload_files(
  folder_id: str | None,
  files: List[UploadFile],
  session_payload: SessionJWTPayload,
  db_session: AsyncSession
):
  if len(files) == 0 or len(files) >= 18:
    raise IncorrectNumberOfFiles()
  
  user = await search_user_with_uid(db_session, session_payload.sub)
  uploaded_files = []

  for file in files:
    file_id = str(uuid4())
    hasher = hashlib.sha256()

    local_path: Path = Config.DATA_FOLDER / session_payload.sub / file_id
    local_path.parent.mkdir(parents=True, exist_ok=True)

    if not file.filename:
      raise FileMustHaveAName()
    
    if "." in file.filename:
      name, extension = file.filename.rsplit(".", 1)
    else:
      name, extension = file.filename, ""

    try:
      total_size = 0

      async with aiofiles.open(local_path, "wb") as f:
        while chunk := await file.read(1024 * 1024): 
          total_size += len(chunk)
          if total_size > Config.MAX_FILE_SIZE:
            raise FileTooLarge()
          hasher.update(chunk)
          await f.write(chunk)


      await create_file_record(
        db_session, 
        file_id, 
        user.id, 
        folder_id,
        name, 
        total_size,
        hasher.hexdigest(),
      )

      uploaded_files.append({
        "id": file_id,
        "name": f"{name}.{extension}",
        "size": total_size,
        "is_folder": False,
      })

    except FileTooLarge:
      if local_path.exists():
        local_path.unlink()
      raise

    except Exception as e:
      if local_path.exists():
        local_path.unlink()
      
      raise InternalServerError()

    finally:
      await file.close()

  return uploaded_files


async def download_file(
  file_id: str,
  db_session: AsyncSession
):
  ...