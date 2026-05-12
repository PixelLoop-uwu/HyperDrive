from fastapi import Request
from pydantic import BaseModel

from src.schemas.auth import ConnectionInfo


def get_connection_info(request: Request) -> ConnectionInfo:
  x_forwarded_for = request.headers.get("x-forwarded-for")
  if x_forwarded_for:
    ip = x_forwarded_for.split(",")[0].strip()
  else:
    ip = request.client.host if request.client else "unknown"
    
  ua = request.headers.get("user-agent")
    
  return ConnectionInfo(ip_address=ip, user_agent=ua)