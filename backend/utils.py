import bcrypt
from uuid import uuid4

def hash_password(password: str) -> str:
  salt = bcrypt.gensalt()  
  hashed = bcrypt.hashpw(password.encode(), salt)
  return hashed.decode()


def verify_password(password: str, hashed: str) -> bool:
  return bcrypt.checkpw(password.encode(), hashed.encode())


def generate_jti() -> str:
  return str(uuid4)