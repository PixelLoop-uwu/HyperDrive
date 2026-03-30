from fastapi import APIRouter, Depends, HTTPException, Response

from backend.schemes import LoginRequest
from backend.database.session import get_db
from backend.services.auth import *
from backend.exceptions import *
from backend.permission.dependencies import resolve_refresh


router = APIRouter(prefix="/auth")

@router.post("/login")
async def login(
  data: LoginRequest,
  response: Response,
  db_session = Depends(get_db)
) -> dict:
  tokens = await authentication(data, db_session)

  response.set_cookie(
    key="refreshToken",
    value=tokens["refreshToken"],
    httponly=True,
    secure=False,
    samesite="strict",
    path="/refresh"
  )

  return {
    "status": "ok",
    "sessionToken": tokens["sessionToken"]
  }


@router.post("/refresh")
async def refresh(
  response: Response,
  db_session = Depends(get_db), 
  refresh_payload = Depends(resolve_refresh)
) -> dict:
  tokens = await refresh_session(refresh_payload, db_session)

  response.set_cookie(
    key="refreshToken",
    value=tokens["refreshToken"],
    httponly=True,
    secure=False,
    samesite="strict",
    path="/refresh"
  )

  return {"status": "ok", "sessionToken": tokens["sessionToken"]}
  

@router.post("logout")
async def logout(
  db_session = Depends(get_db), 
  refresh_payload = Depends(resolve_refresh)
):
  await revoke_refresh_token(refresh_payload, db_session)
  return {"status": "ok"}