from enum import Enum

class ToolCapability(str, Enum):
    """
    Capabilities declared by stadium tool extensions.
    """
    DATABASE = "database"
    SEARCH = "search"
    WEATHER = "weather"
    ANALYTICS = "analytics"
    NAVIGATION = "navigation"
    NOTIFICATION = "notification"
    SCHEDULING = "scheduling"
    INCIDENT_MANAGEMENT = "incident_management"
    CROWD_MONITORING = "crowd_monitoring"
    PARKING_MANAGEMENT = "parking_management"
