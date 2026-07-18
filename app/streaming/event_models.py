import uuid
from datetime import datetime
from typing import Any, Dict, Optional
from pydantic import BaseModel, Field

class SystemEvent(BaseModel):
    """
    Standard schema detailing a system broadcast event packet.
    """
    event_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    event_type: str = Field(..., description="E.g., Security Alert, Crowd Alert, Mission Started")
    source: str = Field(..., description="Entity triggering event (e.g., SecurityAgent, DigitalTwin)")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    priority: str = Field(default="LOW", description="LOW, MEDIUM, HIGH, CRITICAL")
    payload: Dict[str, Any] = Field(default_factory=dict)
    correlation_id: Optional[str] = None
    mission_id: Optional[uuid.UUID] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)
