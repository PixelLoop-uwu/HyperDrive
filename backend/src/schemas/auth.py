from pydantic import BaseModel, Field, EmailStr
from uuid import UUID
from datetime import datetime


class LoginRequest(BaseModel):
  login_identifier: str = Field(..., description="Email or Username")
  password: str

class LoginResponse(BaseModel):
  session_token: str

class RegisterRequest(BaseModel):
  email: EmailStr
  password: str
  username: str
  
class RefreshResponse(BaseModel):
  session_token: str

class SessionToken(BaseModel):
  sub: UUID
  exp: datetime

class AuthenticateTokens(BaseModel):
  refresh_token: str
  session_token: str

class ConnectionInfo(BaseModel):
  ip_address: str
  user_agent: str | None