from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends, File, Path

from backend.permission.dependencies import resolve_session, SessionJWTPayload
from backend.database.session import get_db
from backend.schemes import CreateFolderRequest


router = APIRouter(prefix="/folders")

@router.get("/list/{foler_id}")
async def get_list_folder(
  session_payload: SessionJWTPayload = Depends(resolve_session),
  db_session: AsyncSession = Depends(get_db)
):
  


@router.post("/mkdir")
async def create_root_folder(
  data: CreateFolderRequest,
  session_payload: SessionJWTPayload = Depends(resolve_session),
  db_session: AsyncSession = Depends(get_db)
):
  ...


@router.post("/{folder_id}/mkdir")
async def create_nested_folder(
  data: CreateFolderRequest,
  folder_id: str = Path(...),
  session_payload: SessionJWTPayload = Depends(resolve_session),
  db_session: AsyncSession = Depends(get_db)
):
  ...