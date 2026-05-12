from pydantic_settings import BaseSettings, SettingsConfigDict

class Config(BaseSettings):
  VERSION: str
  DEBUG: bool = True

  HOST: str = "127.0.0.1"
  PORT: int = 1080

  DATABASE_URL: str

  SECRET_KEY: str
  ALGORITHM: str = "HS256"

  ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
  REFRESH_TOKEN_EXPIRE_DAYS: int = 7
  MAX_SESSIONS: int = 30
    
  model_config = SettingsConfigDict(env_file=".env")


config = Config()