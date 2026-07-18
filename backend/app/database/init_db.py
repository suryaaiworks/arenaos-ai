from app.database.base import Base
from app.database.session import engine
from loguru import logger

async def init_db() -> None:
    """
    Schema table initialization hook.
    In development, syncs models metadata tables directly with engine.
    """
    logger.info("Initializing database schemas...")
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("Database schemas synchronization completed successfully.")
    except Exception as e:
        logger.error(f"Error initializing database tables: {e}")
