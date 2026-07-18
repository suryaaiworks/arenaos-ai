from app.agents.plugins.emergency.models import EmergencySeverityLevel

class EmergencyEscalationPolicy:
    """
    Decoupled policies governing emergency evacuations and agent dispatch routing.
    """
    def is_evacuation_required(self, severity: EmergencySeverityLevel) -> bool:
        return severity in [EmergencySeverityLevel.CRITICAL, EmergencySeverityLevel.DISASTER]

    def get_notification_receivers(self, severity: EmergencySeverityLevel) -> list[str]:
        if severity in [EmergencySeverityLevel.CRITICAL, EmergencySeverityLevel.DISASTER]:
            return ["SecurityAgent", "MedicalAgent", "CrowdAgent", "NavigationAgent"]
        if severity == EmergencySeverityLevel.HIGH:
            return ["SecurityAgent", "MedicalAgent", "CrowdAgent"]
        if severity == EmergencySeverityLevel.MEDIUM:
            return ["SecurityAgent", "CrowdAgent"]
        return []
