import uuid
from typing import Any, Dict, List
from pydantic import BaseModel, Field
from app.orchestrator.mission_models import MissionType
from app.orchestrator.mission_state import MissionState

class MissionContext(BaseModel):
    """
    Context parameters detailing active mission variables, active agents, and timeline.
    """
    mission_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    mission_type: MissionType = Field(default=MissionType.SECURITY)
    status: MissionState = Field(default=MissionState.CREATED)
    participating_agents: List[str] = Field(default_factory=list)
    timeline: List[str] = Field(default_factory=list)
    agent_results: Dict[str, Any] = Field(default_factory=dict)
    overall_risk: str = Field(default="LOW")
    recommended_actions: List[str] = Field(default_factory=list)
    completed_tasks: List[str] = Field(default_factory=list)
    pending_tasks: List[str] = Field(default_factory=list)
    execution_time: float = Field(default=0.0)
    metadata: Dict[str, Any] = Field(default_factory=dict)
