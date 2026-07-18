from app.agents.plugins.security.models import SecurityRiskLevel

class SecurityEscalationPolicy:
    """
    Decoupled policy rules governing threat escalation thresholds.
    """
    def is_escalation_required(self, risk_level: SecurityRiskLevel) -> bool:
        # Escalate high and critical risk events immediately
        return risk_level in [SecurityRiskLevel.HIGH, SecurityRiskLevel.CRITICAL]

    def get_notification_receivers(self, risk_level: SecurityRiskLevel) -> list[str]:
        if risk_level == SecurityRiskLevel.CRITICAL:
            return ["EmergencyAgent", "MedicalAgent", "CrowdAgent"]
        if risk_level == SecurityRiskLevel.HIGH:
            return ["EmergencyAgent", "CrowdAgent"]
        if risk_level == SecurityRiskLevel.MEDIUM:
            return ["CrowdAgent"]
        return []
