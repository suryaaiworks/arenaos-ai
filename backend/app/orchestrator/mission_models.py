from enum import Enum

class MissionType(str, Enum):
    FIRE = "Fire Emergency"
    MEDICAL = "Medical Emergency"
    CROWD = "Crowd Congestion"
    SECURITY = "Security Threat"
    LOST_CHILD = "Lost Child"
    GATE_FAILURE = "Gate Failure"
    BOMB_THREAT = "Bomb Threat"
    VIP_INCIDENT = "VIP Incident"
    WEATHER = "Weather Emergency"
    MULTIPLE = "Multiple Concurrent Incidents"
