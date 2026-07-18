import uuid
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field
from app.agents.plugins.emergency.models import EmergencySeverityLevel

class EmergencyRespondRequest(BaseModel):
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    incident: str = Field(..., description="Raw text detailing emergency situation reports")
    context: Dict[str, Any] = Field(default_factory=dict)


class EmergencyIncidentReport(BaseModel):
    """
    Standardized AI output format representing emergency response and multi-agent coordination findings.
    """
    emergency_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    incident_type: str = Field(default="Fire")
    severity: EmergencySeverityLevel = Field(default=EmergencySeverityLevel.INFO)
    confidence: float = Field(default=0.8)
    summary: str
    affected_zone: str = Field(default="Food Court")
    recommended_actions: List[str] = Field(default_factory=list)
    evacuation_required: bool = Field(default=False)
    medical_required: bool = Field(default=False)
    security_required: bool = Field(default=False)
    notify_agents: List[str] = Field(default_factory=list)
    timeline: List[str] = Field(default_factory=list, description="Sequence list logging active evacuation milestones")
    memory_updates: Dict[str, Any] = Field(default_factory=dict)
    metadata: Dict[str, Any] = Field(default_factory=dict)
