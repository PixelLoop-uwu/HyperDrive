from datetime import datetime, timezone, timedelta
from fastapi import status, HTTPException
from pydantic import ValidationError
import jwt

from src.config import config
from src.schemas.auth import SessionToken


def create_session_token(user_id: str):
  expires_at = datetime.now(timezone.utc) + timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)
  to_encode = {
    "sub": str(user_id),
    "exp": expires_at
  }

  encoded_jwt = jwt.encode(to_encode, config.SECRET_KEY, algorithm=config.ALGORITHM)
  return encoded_jwt

def decode_session_token(token: str) -> SessionToken:
  try:
    payload = jwt.decode(token, config.SECRET_KEY, algorithms=[config.ALGORITHM])
    return SessionToken(**payload)
  
  except (jwt.PyJWTError, ValidationError):
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Could not validate credentials",
    )