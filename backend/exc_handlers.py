from fastapi import Request, status
from fastapi.responses import JSONResponse

from backend.exceptions import (
  IncorrectNumberOfFiles,
  FileMustHaveAName,
  FileTooLarge,
  FileAlreadyExists,
  InternalServerError,
  UserNotFound,
  IncorrectPassword,
  InvalidRefreshToken,
  RefreshTokenNotFound,
)

def register_exception_handlers(app):
  
  @app.exception_handler(IncorrectNumberOfFiles)
  async def _(request: Request, exc: IncorrectNumberOfFiles):
    return JSONResponse(
      status_code=status.HTTP_400_BAD_REQUEST,
      content={"detail": "Incorrect number of files"}
    )

  @app.exception_handler(FileMustHaveAName)
  async def _(request: Request, exc: FileMustHaveAName):
    return JSONResponse(
      status_code=status.HTTP_400_BAD_REQUEST,
      content={"detail": "File must have a name"}
    )

  @app.exception_handler(FileTooLarge)
  async def _(request: Request, exc: FileTooLarge):
    return JSONResponse(
      status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
      content={"detail": "File is too large"}
    )

  @app.exception_handler(FileAlreadyExists)
  async def _(request: Request, exc: FileAlreadyExists):
    return JSONResponse(
      status_code=status.HTTP_409_CONFLICT,
      content={"detail": "File already exists"}
    )

  @app.exception_handler(InternalServerError)
  async def _(request: Request, exc: InternalServerError):
    return JSONResponse(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      content={"detail": "Internal server error"}
    )
  
  @app.exception_handler(UserNotFound)
  @app.exception_handler(IncorrectPassword)
  async def _(request: Request, exc: Exception):
    return JSONResponse(
      status_code=status.HTTP_401_UNAUTHORIZED,
      content={"detail": "Invalid credentials"}
    )
  
  @app.exception_handler(InvalidRefreshToken)
  @app.exception_handler(RefreshTokenNotFound)
  async def _(request: Request, exc: Exception):
    return JSONResponse(
      status_code=status.HTTP_401_UNAUTHORIZED,
      content={"detail": "Invalid refresh token"}
    )