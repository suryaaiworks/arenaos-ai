from datetime import datetime, timezone
from sqlalchemy import String, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from app.models.common import CommonBase

class AgentLog(CommonBase):
    """
    SQLAlchemy ORM Model representing execution logs of autonomous ArenaMind agents.
    """
    __tablename__ = "agent_logs"

    agent_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        index=True
    )
    
    log_level: Mapped[str] = mapped_column(
        String(20),
        default="INFO",
        nullable=False
    )
    
    message: Mapped[str] = mapped_column(
        String(2000),
        nullable=False
    )
    
    timestamp: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )
