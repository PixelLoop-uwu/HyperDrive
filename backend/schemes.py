from pydantic import BaseModel
from typing import Literal

class LoginRequest(BaseModel):
  username: str
  password: str


class RenameRequest(BaseModel):
  type: Literal["folder", "file"]
  new_name: str

class CopyRequest(BaseModel):
  type: Literal["folder", "file"]
  dest_folder_id: str

class MoveRequest(BaseModel):
  type: Literal["folder", "file"]
  dest_folder_id: str


class CreateFolderRequest(BaseModel):
  folder_name: str