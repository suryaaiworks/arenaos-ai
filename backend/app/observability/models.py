import uuid
from datetime import datetime
from enum import Enum
from pydantic import BaseModel, Field

class AlertSeverity(str, Enum):
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"
    CRITICAL = "CRITICAL"


class SystemAlert(BaseModel):
    alert_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    severity: AlertSeverity = Field(default=AlertSeverity.WARNING)
    subsystem: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    resolved: bool = Field(default=False)
