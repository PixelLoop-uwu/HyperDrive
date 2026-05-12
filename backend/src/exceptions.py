from loguru import logger

class AppError(Exception):
  def __init__(self, message: str, status_code: int = 400):
    self.message = message
    self.status_code = status_code


class UserAlreadyExistsError(AppError): 
  pass

class UserNotFoundError(AppError): 
  pass

class AuthenticateError(AppError): 
  pass

class SessionNotFoundError(AppError):
  pass

class MissingRefreshTokenError(AppError):
  def __init__(self, message: str = "Refresh token is missing"):
    super().__init__(message, status_code=401)