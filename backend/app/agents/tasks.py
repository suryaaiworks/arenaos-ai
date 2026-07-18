import uuid
from datetime import datetime
from typing import Any, Dict, Optional
from pydantic import BaseModel, Field

class AgentTask(BaseModel):
    """
    Structured model representing a task passed down to the Agent Framework.
    """
    task_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    workflow_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    request_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    priority: str = Field(default="medium")
    task_type: str = Field(..., description="Action/Task category to execute")
    payload: Dict[str, Any] = Field(default_factory=dict)
    context: Dict[str, Any] = Field(default_factory=dict)
    deadline: Optional[datetime] = None
    status: str = Field(default="pending")
    metadata: Dict[str, Any] = Field(default_factory=dict)
