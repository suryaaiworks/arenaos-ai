import uuid
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field

class ToolContext(BaseModel):
    """
    Execution context payload mapping permissions and audit parameters for tools.
    """
    request_id: uuid.UUID
    workflow_id: uuid.UUID
    agent_name: str
    user_id: Optional[uuid.UUID] = None
    session_id: Optional[str] = None
    trace_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    permissions: List[str] = Field(default_factory=list)
    metadata: Dict[str, Any] = Field(default_factory=dict)
