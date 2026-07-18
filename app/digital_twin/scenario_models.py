from enum import Enum

class SimulationType(str, Enum):
    FIRE = "Fire"
    CROWD_SURGE = "Crowd Surge"
    MEDICAL = "Medical Emergency"
    BOMB_THREAT = "Bomb Threat"
    GATE_FAILURE = "Gate Failure"
    HEAVY_RAIN = "Heavy Rain"
    POWER_FAILURE = "Power Failure"
    LOST_CHILD = "Lost Child"
    VIP_INCIDENT = "VIP Incident"
    MULTIPLE = "Multiple Simultaneous Events"
