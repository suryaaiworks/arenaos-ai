import uuid
from typing import Any, Dict, List
from pydantic import BaseModel, Field

class ToolResult(BaseModel):
    """
    Standardized payload result schema returned by every tool execution pipeline run.
    """
    execution_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    tool_id: uuid.UUID
    tool_name: str
    tool_version: str = Field(default="1.0.0")
    status: str = Field(default="completed")
    latency: float = Field(..., description="Latency duration in seconds")
    result: Dict[str, Any] = Field(default_factory=dict)
    errors: List[str] = Field(default_factory=list)
    warnings: List[str] = Field(default_factory=list)
    metadata: Dict[str, Any] = Field(default_factory=dict)
    trace_id: uuid.UUID = Field(default_factory=uuid.uuid4)
