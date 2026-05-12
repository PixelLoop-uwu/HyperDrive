from sqlalchemy import String, func, ForeignKey, DateTime
from sqlalchemy.orm import mapped_column, Mapped, relationship
from datetime import datetime
import uuid

from .base import Base


class User(Base):
  __tablename__ = "users" 

  email: Mapped[str] = mapped_column(
    String(255), unique=True, index=True
  )

  username: Mapped[str | None] = mapped_column(String(50), unique=True) 
  hashed_password: Mapped[str] = mapped_column(String)

  created_at: Mapped[datetime] = mapped_column(
    DateTime(timezone=True), 
    server_default=func.now()
  )

  sessions: Mapped[list["UserSession"]] = relationship(
    back_populates="user", 
    cascade="all, delete-orphan"
  )


class UserSession(Base):
  __tablename__ = "user_sessions"

  user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
  user: Mapped["User"] = relationship(back_populates="sessions")

  refresh_token_hash: Mapped[str] = mapped_column(String, index=True)
    
  user_agent: Mapped[str | None] = mapped_column(String)
  ip_address: Mapped[str | None] = mapped_column(String(45)) 
    
  created_at: Mapped[datetime] = mapped_column(
    DateTime(timezone=True),
    server_default=func.now()
  )
  expires_at: Mapped[datetime] = mapped_column(
    DateTime(timezone=True)
  ) 