from app.agents.plugins.security.metrics import security_metrics
from app.agents.plugins.crowd.metrics import crowd_metrics
from app.agents.plugins.emergency.metrics import emergency_metrics

class AgentMonitor:
    """
    Retrieves and aggregates real-time performance stats for all AI Agents.
    """
    def get_agent_metrics(self) -> dict:
        return {
            "security": security_metrics.get_metrics_report(),
            "crowd": crowd_metrics.get_metrics_report(),
            "emergency": emergency_metrics.get_metrics_report()
        }
