from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.session import get_db

async def get_async_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Dependency injection helper to yield async database sessions inside routers.
    """
    async for session in get_db():
        yield session
