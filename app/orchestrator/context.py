import uuid
from datetime import datetime, timezone
from typing import Any, Dict, Optional
from pydantic import BaseModel, Field, ConfigDict

class OrchestratorContext(BaseModel):
    """
    Standard context tracking metadata parameters throughout the orchestrator pipeline.
    """
    model_config = ConfigDict(arbitrary_types_allowed=True)

    request_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    session_id: Optional[str] = None
    user_id: Optional[uuid.UUID] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    event_id: Optional[uuid.UUID] = None
    priority: str = Field(default="medium")
    metadata: Dict[str, Any] = Field(default_factory=dict)
    request_source: str = Field(default="api")
    language: str = Field(default="en")
