from sqlalchemy import String, Enum as SqlEnum
from sqlalchemy.orm import Mapped, mapped_column
from app.models.common import CommonBase
from app.models.enums import IncidentStatus, Priority

class Incident(CommonBase):
    """
    SQLAlchemy ORM Model representing security, medical, or crowd-congestion incidents.
    """
    __tablename__ = "incidents"

    title: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )
    
    description: Mapped[str | None] = mapped_column(
        String(1000),
        nullable=True
    )
    
    status: Mapped[IncidentStatus] = mapped_column(
        SqlEnum(IncidentStatus),
        default=IncidentStatus.ACTIVE,
        nullable=False,
        index=True
    )
    
    priority: Mapped[Priority] = mapped_column(
        SqlEnum(Priority),
        default=Priority.MEDIUM,
        nullable=False,
        index=True
    )
    
    location: Mapped[str | None] = mapped_column(
        String(250),
        nullable=True
    )
