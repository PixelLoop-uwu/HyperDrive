from datetime import datetime, timezone
from typing import Optional
from uuid import uuid4
from sqlalchemy import (
  String,
  Boolean,
  Integer,
  DateTime,
  ForeignKey,
  Index
)
from sqlalchemy.orm import (
  DeclarativeBase,
  Mapped,
  mapped_column,
  relationship
)


class Base(DeclarativeBase):
  pass



class User(Base):
  __tablename__ = "users"

  id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid4()))

  username: Mapped[str] = mapped_column(String, unique=True, index=True)
  email: Mapped[str] = mapped_column(String, unique=True, index=True)
  password_hash: Mapped[str] = mapped_column(String)

  created_at: Mapped[datetime] = mapped_column(
    DateTime,
    default=lambda: datetime.now(timezone.utc)
  )

  refresh_tokens: Mapped[list["RefreshToken"]] = relationship(
    back_populates="user",
    cascade="all, delete-orphan"
  )

  files: Mapped[list["File"]] = relationship(
    back_populates="user",
    cascade="all, delete-orphan"
  )

  folders: Mapped[list["Folder"]] = relationship(
    back_populates="user",
    cascade="all, delete-orphan"
  )



class RefreshToken(Base):
  __tablename__ = "refresh_tokens"

  jti: Mapped[str] = mapped_column(String, primary_key=True)
  user: Mapped["User"] = relationship(back_populates="refresh_tokens")

  user_id: Mapped[str] = mapped_column(
    String,
    ForeignKey("users.id", ondelete="CASCADE"),
    index=True
  )

  revoked: Mapped[bool] = mapped_column(Boolean, default=False)
  expires_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)



class File(Base):
  __tablename__ = "files"

  id: Mapped[str] = mapped_column(String, primary_key=True)

  user_id: Mapped[str] = mapped_column(
    ForeignKey("users.id", ondelete="CASCADE"),
    index=True
  )

  user: Mapped["User"] = relationship(back_populates="files")

  folder_id: Mapped[Optional[str]] = mapped_column(
    ForeignKey("folders.id", ondelete="CASCADE"),
    nullable=True
  )

  folder: Mapped[Optional["Folder"]] = relationship(backref="files")

  name: Mapped[str]
  hash: Mapped[str]
  size: Mapped[int]



class Folder(Base):
  __tablename__ = "folders"

  id: Mapped[str] = mapped_column(String, primary_key=True)

  user_id: Mapped[str] = mapped_column(
    ForeignKey("users.id", ondelete="CASCADE"),
    index=True
  )

  user: Mapped["User"] = relationship(back_populates="folders")

  parent_id: Mapped[Optional[str]] = mapped_column(
    ForeignKey("folders.id", ondelete="CASCADE"),
    nullable=True
  )

  parent: Mapped[Optional["Folder"]] = relationship(
    remote_side="Folder.id",
    backref="children"
  )

  name: Mapped[str]



Index("a", User.username)
Index("b", RefreshToken.jti)
Index("c", RefreshToken.expires_at)
Index("d", File.id)