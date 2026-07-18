import time
from typing import List

class SimulationTimeline:
    """
    Manages chronological event logging during active stadium simulation progression.
    """
    def __init__(self):
        self._events: List[str] = []

    def log_event(self, detail: str) -> None:
        stamp = time.strftime("%H:%M:%S")
        self._events.append(f"{stamp} - {detail}")

    def get_events(self) -> List[str]:
        return self._events
