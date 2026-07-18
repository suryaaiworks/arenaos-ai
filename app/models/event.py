from datetime import datetime, timezone
from sqlalchemy import String, DateTime, Enum as SqlEnum
from sqlalchemy.orm import Mapped, mapped_column
from app.models.common import CommonBase
from app.models.enums import EventType

class Event(CommonBase):
    """
    SQLAlchemy ORM Model representing dynamic stadium telemetry/stream event notifications.
    """
    __tablename__ = "events"

    title: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )
    
    description: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True
    )
    
    type: Mapped[EventType] = mapped_column(
        SqlEnum(EventType),
        nullable=False,
        index=True
    )
    
    timestamp: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )
