from sqlalchemy.ext.asyncio import AsyncSession

from backend.schemes import LoginRequest
from backend.database.auth import * 
from backend.utils import verify_password, generate_jti
from backend.permission.jwt import generate_refresh_jwt, generate_session_jwt, RefreshJwtPayload


async def register():
  ...


async def authentication(data: LoginRequest, db_session: AsyncSession) -> dict:
  current_user = await search_user_with_username(db_session, data.username)

  if not verify_password(data.password, current_user.password_hash):
    raise IncorrectPassword()

  jti = generate_jti()

  refresh_token_jwt = generate_refresh_jwt(current_user.id, jti)
  session_token_jwt = generate_session_jwt(current_user.id)

  await create_refresh_token(db_session, current_user.id, jti)

  return {
    "refreshToken": refresh_token_jwt,
    "sessionToken": session_token_jwt
  }


async def refresh_session(refresh_payload: RefreshJwtPayload, db_session: AsyncSession) -> dict:
  token = await search_refresh_token(db_session, refresh_payload.jti)

  if token.revoked or refresh_payload.sub != token.user_id:
    raise InvalidRefreshToken()
  
  await revoke_token(db_session, refresh_payload.jti)

  new_jti = generate_jti()

  refresh_token_jwt = generate_refresh_jwt(token.user_id, new_jti)
  session_token_jwt = generate_session_jwt(token.user_id)

  await create_refresh_token(db_session, token.user_id, new_jti)

  return {
    "refreshToken": refresh_token_jwt,
    "sessionToken": session_token_jwt
  }


async def revoke_refresh_token(refresh_payload: RefreshJwtPayload, db_session: AsyncSession):
  await revoke_token(db_session, refresh_payload.jti)

