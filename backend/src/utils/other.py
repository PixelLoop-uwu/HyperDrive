import secrets


def generate_opaque(len: int = 32) -> str:
  return secrets.token_urlsafe(len)