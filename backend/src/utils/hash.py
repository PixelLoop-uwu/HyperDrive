import bcrypt
import hashlib
import hmac
from src.config import config


def hash_something(to_hash: str) -> str:
  salt = bcrypt.gensalt()
  hashed = bcrypt.hashpw(to_hash.encode('utf-8'), salt)
  return hashed.decode('utf-8')

def verify_hash(to_hash: str, hash: str) -> bool:
  return bcrypt.checkpw(
    to_hash.encode('utf-8'), 
    hash.encode('utf-8')
  )


def token_digest(token: str) -> str:
  secret = config.SECRET_KEY.encode('utf-8')
  return hmac.new(secret, token.encode('utf-8'), hashlib.sha256).hexdigest()