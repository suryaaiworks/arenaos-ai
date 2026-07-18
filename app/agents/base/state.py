from enum import Enum

class AgentState(str, Enum):
    """
    Lifecycle operational states for independent agents in the framework.
    """
    CREATED = "created"
    INITIALIZING = "initializing"
    READY = "ready"
    RUNNING = "running"
    WAITING = "waiting"
    BUSY = "busy"
    ERROR = "error"
    STOPPED = "stopped"
    OFFLINE = "offline"
