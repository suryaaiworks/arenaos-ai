import sys
from loguru import logger
from app.core.config import settings

def setup_logging() -> None:
    """
    Configures Loguru logger with custom formats and colors for stdout.
    """
    # Remove default Loguru handler
    logger.remove()

    # Determine log level based on ENVIRONMENT setting
    log_level = "DEBUG" if settings.ENVIRONMENT == "development" else "INFO"

    # Define color-coded format structure
    log_format = (
        "<green>{time:YYYY-MM-DD HH:mm:ss.SSS}</green> | "
        "<level>{level: <8}</level> | "
        "<cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - "
        "<level>{message}</level>"
    )

    # Register formatted console sink
    logger.add(
        sys.stdout,
        level=log_level,
        format=log_format,
        colorize=True,
        backtrace=True,
        diagnose=True,
    )

    logger.info("Structured logging pipeline initialized successfully.")
