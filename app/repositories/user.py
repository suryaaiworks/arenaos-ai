from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.base import BaseRepository
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from loguru import logger

class UserRepository(BaseRepository[User, UserCreate, UserUpdate]):
    """
    Concrete Repository mapping actions to User model.
    """
    def __init__(self):
        super().__init__(User)

    async def get_by_username(self, db: AsyncSession, username: str) -> User | None:
        """
        Retrieves user by unique username.
        """
        logger.debug(f"UserRepository: Fetching username {username}")
        query = select(User).where(User.username == username, User.is_deleted == False)
        result = await db.execute(query)
        return result.scalar_one_or_none()

    async def get_by_email(self, db: AsyncSession, email: str) -> User | None:
        """
        Retrieves user by unique email.
        """
        logger.debug(f"UserRepository: Fetching email {email}")
        query = select(User).where(User.email == email, User.is_deleted == False)
        result = await db.execute(query)
        return result.scalar_one_or_none()
