from pydantic import Field
from app.agents.base.config import AgentConfiguration

class CrowdAgentConfiguration(AgentConfiguration):
    """
    Configuration parameters controlling crowd density thresholds and alerts.
    """
    density_alert_threshold: str = Field(default="HIGH")
    auto_escalation_enabled: bool = Field(default=True)
    normal_capacity_limit: int = Field(default=5000)
