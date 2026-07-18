from pydantic import Field
from app.agents.base.config import AgentConfiguration

class SecurityAgentConfiguration(AgentConfiguration):
    """
    Configuration parameters controlling risk filters and timeout thresholds.
    """
    escalation_priority_threshold: str = Field(default="HIGH")
    auto_trigger_emergency_dispatch: bool = Field(default=True)
    confidence_reporting_threshold: float = Field(default=0.6)
