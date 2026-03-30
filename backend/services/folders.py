from sqlalchemy.ext.asyncio import AsyncSession

from backend.permission.dependencies import SessionJWTPayload


async def get_folder_list(
  file_id: str, 
  session_payload: SessionJWTPayload, 
  db_session: AsyncSession
) -> list[dict]:
  