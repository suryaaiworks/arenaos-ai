import uuid
from typing import Any, Dict, List
from pydantic import BaseModel, Field
from app.replay.models import ReplayState, PlaySpeed

class ReplayStartRequest(BaseModel):
    mission_id: uuid.UUID = Field(..., description="Target mission context ID to replay")
    speed: PlaySpeed = Field(default=PlaySpeed.NORMAL)
    context: Dict[str, Any] = Field(default_factory=dict)


class ReplayReport(BaseModel):
    """
    Standardized report representing incident replay sequence and aggregated summaries.
    """
    replay_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    mission_id: uuid.UUID
    status: ReplayState = Field(default=ReplayState.STOPPED)
    speed: PlaySpeed = Field(default=PlaySpeed.NORMAL)
    timeline: List[str] = Field(default_factory=list)
    events: List[Dict[str, Any]] = Field(default_factory=list)
    participating_agents: List[str] = Field(default_factory=list)
    tool_usage: List[str] = Field(default_factory=list)
    decision_summary: str = Field(..., description="Narrative summary detailing why agent decisions were reached")
    communication_summary: str = Field(..., description="Summary mapping dispatched channel packet routing counts")
    duration: float = Field(default=0.0)
    performance_metrics: Dict[str, Any] = Field(default_factory=dict)
    metadata: Dict[str, Any] = Field(default_factory=dict)
