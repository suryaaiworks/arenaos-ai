import uuid
from typing import Any, Dict, List
from pydantic import BaseModel, Field
from app.orchestrator.mission_models import MissionType
from app.orchestrator.mission_state import MissionState

class MissionStartRequest(BaseModel):
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    incident: str = Field(..., description="Prompt detailing multi-agent complex security/crowd incident")
    context: Dict[str, Any] = Field(default_factory=dict)


class MissionSimulateRequest(BaseModel):
    incident: str = Field(..., description="Prompt detailing simulated multi-agent complex security/crowd incident")


class MissionReportResponse(BaseModel):
    mission_id: uuid.UUID
    mission_type: MissionType
    status: MissionState
    participating_agents: List[str]
    timeline: List[str]
    agent_results: Dict[str, Any]
    overall_risk: str
    recommended_actions: List[str]
    completed_tasks: List[str]
    pending_tasks: List[str]
    execution_time: float
    metadata: Dict[str, Any]
