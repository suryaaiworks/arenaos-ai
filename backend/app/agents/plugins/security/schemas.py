import uuid
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field
from app.agents.plugins.security.models import SecurityIncidentType, SecurityRiskLevel

class SecurityAnalyzeRequest(BaseModel):
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    incident: str = Field(..., description="Details of raw stadium surveillance incident report text")
    context: Dict[str, Any] = Field(default_factory=dict)


class SecurityIncidentReport(BaseModel):
    """
    Standardized AI output format representing security incident analysis findings.
    """
    incident_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    incident_type: SecurityIncidentType = Field(default=SecurityIncidentType.UNKNOWN)
    risk_level: SecurityRiskLevel = Field(default=SecurityRiskLevel.LOW)
    confidence: float = Field(default=0.8)
    summary: str
    recommended_actions: List[str] = Field(default_factory=list)
    required_tools: List[str] = Field(default_factory=list)
    escalation_required: bool = Field(default=False)
    notify_agents: List[str] = Field(default_factory=list)
    memory_updates: Dict[str, Any] = Field(default_factory=dict)
    metadata: Dict[str, Any] = Field(default_factory=dict)
