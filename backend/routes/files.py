from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends, UploadFile, File, Path, Query
from typing import List

import backend.services.files as files_service 
from backend.permission.dependencies import resolve_session
from backend.database.session import get_db


router = APIRouter(prefix="/files")

@router.post("/{folder_id}/upload")
async def upload_to_folder(
  folder_id: str = Path(...),
  files: List[UploadFile] = File(...),
  session_payload = Depends(resolve_session),
  db_session: AsyncSession = Depends(get_db)
):
  uploaded_files = await files_service.upload_files(
    folder_id, 
    files,  
    session_payload, 
    db_session
  )

  return {"status": "ok", "uploaded": uploaded_files}


@router.post("/upload")
async def upload_to_root(
  files: List[UploadFile] = File(...),
  session_payload = Depends(resolve_session),
  db_session: AsyncSession = Depends(get_db)
):
  uploaded_files = await files_service.upload_files(
    None, 
    files, 
    session_payload, 
    db_session
  )

  return {"status": "ok", "uploaded": uploaded_files}


@router.get("{file_id}")
async def download_file(
  file_id: str = Path(...),
  download: bool = Query(False),
  session_payload = Depends(resolve_session),
  db_session: AsyncSession = Depends(get_db)
):
  ...