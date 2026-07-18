import uuid
from typing import Any, Dict, List
from pydantic import BaseModel, Field
from app.orchestrator.state import OrchestratorState

class OrchestratorResponse(BaseModel):
    """
    Standardized result structure returned by every ArenaMind execution pipeline execution.
    """
    request_id: uuid.UUID
    workflow_id: uuid.UUID
    status: OrchestratorState
    selected_agent: str
    execution_time: float = Field(..., description="Execution latency duration in seconds")
    result: Dict[str, Any] = Field(default_factory=dict)
    warnings: List[str] = Field(default_factory=list)
    errors: List[str] = Field(default_factory=list)
    metadata: Dict[str, Any] = Field(default_factory=dict)
    trace_id: uuid.UUID = Field(default_factory=uuid.uuid4)
