from datetime import datetime, timedelta, timezone
from typing import Type, TypeVar, Optional
from jose import jwt, JWTError
from pydantic import BaseModel, ValidationError

from backend.config import Config


class SessionJWTPayload(BaseModel):
  sub: str
  type: str = "session"

class RefreshJWTPayload(BaseModel):
  sub: str
  jti: str
  type: str = "refresh"



def generate_session_jwt(uid: str) -> str:
  life_time = 15 # Minutes

  now = datetime.now(timezone.utc)
  exp = now + timedelta(minutes=life_time)

  payload = {
    "sub": uid,
    "type": "session",

    "iat": int(now.timestamp()),
    "exp": int(exp.timestamp())
  }

  return jwt.encode(
    payload,
    Config.JWT_SECRET,
    algorithm=Config.JWT_ALGORITHM
  )


def generate_refresh_jwt(uid: str, jti: str) -> str:
  life_time = 24 # Days

  now = datetime.now(timezone.utc)
  exp = now + timedelta(days=life_time)

  payload = {
    "sub": uid,
    "jti": jti,
    "type": "refresh",

    "iat": int(now.timestamp()),
    "exp": int(exp.timestamp())
  }

  return jwt.encode(
    payload,
    Config.JWT_SECRET,
    algorithm=Config.JWT_ALGORITHM
  )



def decode_jwt(token: str, model: BaseModel) -> BaseModel:
  try:
    payload = jwt.decode(
      token, 
      Config.JWT_SECRET, 
      algorithms=[Config.JWT_ALGORITHM] 
    )

    return model.model_validate(payload)
    
  except (JWTError, ValidationError):
    return None