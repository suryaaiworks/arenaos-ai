import uuid
from datetime import datetime
from typing import Any, Dict, Optional
from pydantic import BaseModel, Field

class MemoryRecord(BaseModel):
    """
    Standard model representing a single memory record entry.
    """
    memory_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    session_id: str
    memory_type: str = Field(..., description="short_term, long_term, session, conversation, workflow, agent, tool, execution")
    content: Dict[str, Any] = Field(default_factory=dict)
    metadata: Dict[str, Any] = Field(default_factory=dict)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    expiration: Optional[datetime] = None
