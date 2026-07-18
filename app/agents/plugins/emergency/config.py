from pydantic import Field
from app.agents.base.config import AgentConfiguration

class EmergencyAgentConfiguration(AgentConfiguration):
    """
    Configuration parameters controlling severity thresholds.
    """
    auto_trigger_emergency_evac: bool = Field(default=True)
    minimum_criticality_level: str = Field(default="HIGH")
