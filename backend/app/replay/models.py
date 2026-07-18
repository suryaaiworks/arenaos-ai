from enum import Enum

class ReplayState(str, Enum):
    PLAYING = "PLAYING"
    PAUSED = "PAUSED"
    STOPPED = "STOPPED"


class PlaySpeed(str, Enum):
    NORMAL = "1x"
    FAST = "2x"
    SUPER_FAST = "4x"
