from enum import Enum

class OrchestratorState(str, Enum):
    """
    State machine representing the lifecycle stages of an ArenaMind request.
    """
    RECEIVED = "received"
    VALIDATED = "validated"
    QUEUED = "queued"
    DISPATCHED = "dispatched"
    RUNNING = "running"
    WAITING = "waiting"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"
