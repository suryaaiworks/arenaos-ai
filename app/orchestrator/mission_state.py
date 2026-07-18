from enum import Enum

class MissionState(str, Enum):
    CREATED = "CREATED"
    PLANNING = "PLANNING"
    ASSIGNED = "ASSIGNED"
    RUNNING = "RUNNING"
    WAITING = "WAITING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"
    CANCELLED = "CANCELLED"
