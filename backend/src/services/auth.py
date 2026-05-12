from fastapi import Depends
from datetime import datetime, timezone, timedelta

from src.schemas.auth import *
from src.repositories.auth import UserRepository, get_user_repo
from src.repositories.session import SessionRepository, get_session_repo
from src.utils import create_session_token, generate_opaque, hash_something, verify_hash, token_digest
from src.schemas.auth import RegisterRequest, LoginRequest, AuthenticateTokens, ConnectionInfo
from src.exceptions import AuthenticateError
from src.config import config


class AuthService:
  def __init__(self, user_repo: UserRepository, session_repo: SessionRepository):
    self.user_repo = user_repo
    self.session_repo = session_repo

  async def register_user(self, data: RegisterRequest) -> None:
    password_hash = hash_something(data.password)
    await self.user_repo.create_user(data.email, data.username, password_hash)

  async def authenticate_user(self, data: LoginRequest, connection_info: ConnectionInfo) -> AuthenticateTokens:
    user = await self.user_repo.get_user_by_ident(data.login_identifier)
    
    if not verify_hash(data.password, user.hashed_password):
      raise AuthenticateError("Incorrect login or password")

    refresh_expires_at = datetime.now(timezone.utc) + timedelta(days=config.REFRESH_TOKEN_EXPIRE_DAYS)
    refresh_token = generate_opaque()
    
    await self.session_repo.create_session(
      user_id=user.id, 
      token_hash=token_digest(refresh_token), 
      user_agent=connection_info.user_agent, 
      ip=connection_info.ip_address,
      expires_at=refresh_expires_at
    )

    session_token = create_session_token(user.id)
    
    return AuthenticateTokens(
      refresh_token=refresh_token,
      session_token=session_token 
    )

  async def refresh_tokens(self, refresh_token: str) -> AuthenticateTokens:
    old_hash = token_digest(refresh_token)
    
    session = await self.session_repo.get_session(old_hash)
    
    new_refresh_token = generate_opaque()
    new_hash = token_digest(new_refresh_token)
    new_expires_at = datetime.now(timezone.utc) + timedelta(days=config.REFRESH_TOKEN_EXPIRE_DAYS)
    
    await self.session_repo.update_session(
      old_token_hash=old_hash,
      new_token_hash=new_hash,
      new_expires_at=new_expires_at
    )

    session_token = create_session_token(session.user_id)
    
    return AuthenticateTokens(
      session_token=session_token, 
      refresh_token=new_refresh_token
    )

  async def revoke_token(self, refresh_token: str) -> None:
    token_hash = token_digest(refresh_token)
    await self.session_repo.delete_session(token_hash)



async def get_auth_service(
  user_repo: UserRepository = Depends(get_user_repo),
  session_repo: SessionRepository = Depends(get_session_repo)
) -> AuthService:
  return AuthService(user_repo, session_repo)