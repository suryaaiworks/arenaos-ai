from enum import Enum

class UserRole(str, Enum):
    """
    User permissions and workspace role levels.
    """
    ADMIN = "admin"
    OPERATOR = "operator"
    PARAMEDIC = "paramedic"
    SECURITY = "security"
    SPECTATOR = "spectator"


class IncidentStatus(str, Enum):
    """
    Ingress incident lifecycle states.
    """
    ACTIVE = "active"
    ACKNOWLEDGED = "acknowledged"
    RESOLVED = "resolved"
    DISMISSED = "dismissed"


class Priority(str, Enum):
    """
    Incident priority levels.
    """
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class EventType(str, Enum):
    """
    Smart stadium stream event category.
    """
    SPECTATOR_FLOW = "spectator_flow"
    CONCESSION_TELEMETRY = "concession_telemetry"
    INCIDENT_ALERT = "incident_alert"
    SECURITY_OVERRIDE = "security_override"


class AgentStatus(str, Enum):
    """
    ArenaMind orchestration agent states.
    """
    ONLINE = "online"
    OFFLINE = "offline"
    THINKING = "thinking"
    EXECUTING_ACTION = "executing_action"
