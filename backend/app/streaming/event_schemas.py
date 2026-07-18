import uuid
from typing import Any, Dict, Optional
from pydantic import BaseModel, Field

class EventPublishRequest(BaseModel):
    event_type: str = Field(..., description="Category of event payload")
    source: str = Field(..., description="Sender module key")
    priority: str = Field(default="LOW")
    payload: Dict[str, Any] = Field(default_factory=dict)
    correlation_id: Optional[str] = None
    mission_id: Optional[uuid.UUID] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)
