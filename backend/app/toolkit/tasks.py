import uuid
from datetime import datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field

class ToolTask(BaseModel):
    """
    Structured model representing a tool execution task.
    """
    task_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    workflow_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    request_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    tool_name: str = Field(..., description="Target tool identifier to run")
    agent_name: str = Field(..., description="Calling agent class")
    priority: str = Field(default="medium")
    payload: Dict[str, Any] = Field(default_factory=dict)
    context: Dict[str, Any] = Field(default_factory=dict)
    permissions: List[str] = Field(default_factory=list)
    metadata: Dict[str, Any] = Field(default_factory=dict)
    deadline: Optional[datetime] = None
