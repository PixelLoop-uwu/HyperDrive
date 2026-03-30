from pydantic import BaseModel
from dotenv import load_dotenv
from typing import ClassVar
from pathlib import Path
import os


load_dotenv()

class Config(BaseModel):
    LOGS_FOLDER: ClassVar[Path] = Path("./logs")
    DATA_FOLDER: ClassVar[Path] = Path("./Storage")
    DATABASE_PATH: ClassVar[Path] = DATA_FOLDER / "base.db"

    MAX_FILE_SIZE = 1024 * 1024 * 512 

    ROOT_USERNAME: ClassVar[str] = "goidochka"
    ROOT_EMAIL: ClassVar[str] = "ROOT"
    ROOT_PASSWORD: ClassVar[str] = "123"
    
    JWT_HASH: ClassVar[str] = os.getenv("JWTHASH")
    JWT_ALGORITHM: ClassVar[str] = os.getenv("JWTALG")
  

  