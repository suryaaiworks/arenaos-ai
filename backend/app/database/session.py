import time
from typing import AsyncGenerator
from sqlalchemy import event, text
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from app.core.config import settings
from loguru import logger

# Initialize Async Engine with connection pooling and pre-ping support
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False,
    future=True,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,
    pool_recycle=1800
)

# Async Session Factory
SessionLocal = async_sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    expire_on_commit=False,
    class_=AsyncSession
)

# Register slow query logging hooks on the sync engine
@event.listens_for(engine.sync_engine, "before_cursor_execute")
def before_cursor_execute(conn, cursor, statement, parameters, context, execmany):
    context._query_start_time = time.time()

@event.listens_for(engine.sync_engine, "after_cursor_execute")
def after_cursor_execute(conn, cursor, statement, parameters, context, execmany):
    total_time = time.time() - context._query_start_time
    if total_time > 0.2:  # Slow query threshold: 200ms
        logger.warning(f"Slow Query Hook: Execution time {total_time:.3f}s | Statement: {statement[:300]}...")


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Yields async database sessions.
    Monitors transactions and logs session lifespan.
    """
    logger.debug("Database Session Created")
    async with SessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()


async def check_db_health() -> dict:
    """
    Lightweight health check mapping a SELECT 1 ping.
    Returns latency statistics or graceful database errors.
    """
    start_time = time.time()
    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        latency = (time.time() - start_time) * 1000
        logger.info("Database Connected: Connection health ping verified.")
        return {
            "status": "healthy",
            "database": "connected",
            "latency_ms": f"{latency:.2f}"
        }
    except Exception as e:
        logger.error(f"Database Connection Failed: ping check error: {e}")
        return {
            "status": "degraded",
            "database": "not_connected",
            "latency_ms": "0.00"
        }
