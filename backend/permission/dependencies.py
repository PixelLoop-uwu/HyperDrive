from fastapi import HTTPException, Request, Depends
from fastapi.security import OAuth2PasswordBearer

from backend.permission.jwt import decode_jwt, RefreshJWTPayload, SessionJWTPayload


async def resolve_refresh(request: Request) -> RefreshJWTPayload:
  token = request.cookies.get("refreshToken")

  if not token:
    raise HTTPException(
      status_code=401,
      detail="Refresh token missing"
    )
  
  payload = decode_jwt(token, RefreshJWTPayload)

  if payload is None or payload.get("type") != "refresh":
    raise HTTPException(
      status_code=401,
      detail="Invalid refresh token"
    )
  
  return payload


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")
async def resolve_session(session_token: str = Depends(oauth2_scheme)) -> SessionJWTPayload:
  payload = decode_jwt(session_token, SessionJWTPayload)

  if payload is None or payload.get("type") != "session":
    raise HTTPException(
      status_code=401,
      detail="Invalid session token"
    )
  
  return payload