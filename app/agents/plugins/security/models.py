from enum import Enum

class SecurityIncidentType(str, Enum):
    CROWD_CONGESTION = "Crowd congestion"
    UNAUTHORIZED_ACCESS = "Unauthorized access"
    SUSPICIOUS_OBJECT = "Suspicious object"
    VIOLENCE = "Violence"
    MEDICAL_EMERGENCY = "Medical emergency"
    FIRE_ALERT = "Fire alert"
    GATE_BREACH = "Gate breach"
    LOST_CHILD = "Lost child"
    EQUIPMENT_FAILURE = "Security equipment failure"
    UNKNOWN = "Unknown incident"


class SecurityRiskLevel(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"
