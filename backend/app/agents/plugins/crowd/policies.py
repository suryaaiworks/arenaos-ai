from app.agents.plugins.crowd.models import CrowdRiskLevel

class CrowdEscalationPolicy:
    """
    Decoupled policies governing crowd safety thresholds.
    """
    def is_rerouting_required(self, risk_level: CrowdRiskLevel) -> bool:
        return risk_level in [CrowdRiskLevel.HIGH, CrowdRiskLevel.CRITICAL]

    def get_notification_receivers(self, risk_level: CrowdRiskLevel) -> list[str]:
        if risk_level == CrowdRiskLevel.CRITICAL:
            return ["SecurityAgent", "EmergencyAgent", "NavigationAgent"]
        if risk_level == CrowdRiskLevel.HIGH:
            return ["SecurityAgent", "NavigationAgent"]
        if risk_level == CrowdRiskLevel.MEDIUM:
            return ["NavigationAgent"]
        return []
