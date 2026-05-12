import sys
from pathlib import Path
from loguru import logger


def setup_logging() -> None:
  logger.remove()
  
  logs_dir = Path(__file__).parent.parent.parent.parent / "logs"
  logs_dir.mkdir(exist_ok=True)
  
  logger.add(
    sys.stdout,
    format="<level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>",
    level="INFO",
    colorize=True,
  )
  
  logger.add(
    logs_dir / "api.log",
    format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {name}:{function}:{line} - {message}",
    level="DEBUG",
    rotation="500 MB",
    retention="7 days",
    compression="zip",
  )
  
  logger.add(
    logs_dir / "api.errors.log",
    format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {name}:{function}:{line} - {message}",
    level="ERROR",
    rotation="500 MB",
    retention="30 days",
  )



