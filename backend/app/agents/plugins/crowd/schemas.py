import uuid
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field
from app.agents.plugins.crowd.models import CrowdDensityLevel, CrowdRiskLevel

class CrowdAnalyzeRequest(BaseModel):
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    incident: str = Field(..., description="Raw text describing the stadium crowd buildup or evacuation scenario")
    context: Dict[str, Any] = Field(default_factory=dict)


class CrowdIncidentReport(BaseModel):
    """
    Standardized AI output format representing crowd analysis and predictions findings.
    """
    analysis_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    crowd_zone: str = Field(default="Zone A")
    density_level: CrowdDensityLevel = Field(default=CrowdDensityLevel.LOW)
    estimated_people: int = Field(default=100)
    risk_level: CrowdRiskLevel = Field(default=CrowdRiskLevel.LOW)
    confidence: float = Field(default=0.8)
    summary: str
    predicted_behavior: str = Field(default="Normal crowd movement")
    recommended_actions: List[str] = Field(default_factory=list)
    rerouting_required: bool = Field(default=False)
    notify_agents: List[str] = Field(default_factory=list)
    memory_updates: Dict[str, Any] = Field(default_factory=dict)
    metadata: Dict[str, Any] = Field(default_factory=dict)
