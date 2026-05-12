from fastapi import APIRouter, Response, Depends, Cookie, status

from src.schemas.auth import *
from src.services.auth import get_auth_service, AuthService
from src.dependencies.conection_info import get_connection_info
from src.exceptions import MissingRefreshTokenError
from src.config import config


router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(
  data: RegisterRequest, 
  auth_service: AuthService = Depends(get_auth_service)
):
  await auth_service.register_user(data)
  return Response(status_code=status.HTTP_201_CREATED)


@router.post("/login", response_model=LoginResponse)
async def login(
  data: LoginRequest, 
  response: Response, 
  connection_info: ConnectionInfo = Depends(get_connection_info),
  auth_service: AuthService = Depends(get_auth_service)
):
  tokens = await auth_service.authenticate_user(data, connection_info)
    
  response.set_cookie(
    key="refresh_token",
    value=tokens.refresh_token,
    httponly=True,
    secure=not config.DEBUG,
    samesite="lax",
    path=f"/v{config.VERSION}/auth"
  )
  return tokens 


@router.post("/refresh", response_model=RefreshResponse)
async def refresh(
  response: Response, 
  refresh_token: str | None = Cookie(None),
  auth_service: AuthService = Depends(get_auth_service)
):
  if not refresh_token:
    raise MissingRefreshTokenError()

  new_tokens = await auth_service.refresh_tokens(refresh_token)
    
  response.set_cookie(
    key="refresh_token",
    value=new_tokens.refresh_token,
    httponly=True,
    secure=not config.DEBUG,
    path=f"/v{config.VERSION}/auth"
  )
  return new_tokens


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(
  response: Response,
  refresh_token: str | None = Cookie(None),
  auth_service: AuthService = Depends(get_auth_service)
):
  if refresh_token:
    await auth_service.revoke_token(refresh_token)
    
  response.delete_cookie(key="refresh_token", path=f"/v{config.VERSION}/auth")
  return Response(status_code=status.HTTP_204_NO_CONTENT)
