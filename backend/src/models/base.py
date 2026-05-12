from sqlalchemy.orm import (
  DeclarativeBase, 
  mapped_column, 
  Mapped
)
import uuid


class Base(DeclarativeBase):
  id: Mapped[uuid.UUID] = mapped_column(
    primary_key=True, 
    default=uuid.uuid4
  )