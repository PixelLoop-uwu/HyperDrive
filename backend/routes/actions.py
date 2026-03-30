from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends

import backend.services.actions as actions_servive
from backend.permission.dependencies import resolve_session
from backend.database.session import get_db
from backend.schemes import (
  CopyRequest,
  RenameRequest,
  MoveRequest
)


router = APIRouter(prefix="/actions")

@router.patch("/{file_id}/rename")
async def rename_element(
  data: RenameRequest,
  session_payload = Depends(resolve_session),
  db_session: AsyncSession = Depends(get_db)
):
  ...


@router.patch("/{file_id}/move")
async def move_element(
  data: MoveRequest,
  session_payload = Depends(resolve_session),
  db_session: AsyncSession = Depends(get_db)
):
  ...


@router.post("/{file_id}/copy")
async def copy_element(
  data: CopyRequest,
  session_payload = Depends(resolve_session),
  db_session: AsyncSession = Depends(get_db)
):
  ...