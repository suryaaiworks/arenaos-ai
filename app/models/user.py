from sqlalchemy import String, Boolean, Enum as SqlEnum
from sqlalchemy.orm import Mapped, mapped_column
from app.models.common import CommonBase
from app.models.enums import UserRole

class User(CommonBase):
    """
    SQLAlchemy ORM Model representing an ArenaOS UI/console user.
    """
    __tablename__ = "users"

    username: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        index=True,
        nullable=False
    )
    
    email: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        index=True,
        nullable=False
    )
    
    role: Mapped[UserRole] = mapped_column(
        SqlEnum(UserRole),
        default=UserRole.SPECTATOR,
        nullable=False
    )
    
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False
    )
