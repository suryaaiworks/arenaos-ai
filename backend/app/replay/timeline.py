import time
from typing import List, Dict, Any

class ReplayTimeline:
    """
    Manages chronological playback event packets logs list.
    """
    def __init__(self):
        self._events: List[Dict[str, Any]] = []

    def add_step(self, type_key: str, description: str, metadata: Dict[str, Any] = None) -> None:
        self._events.append({
            "timestamp": time.strftime("%H:%M:%S"),
            "event_type": type_key,
            "description": description,
            "metadata": metadata or {}
        })

    def get_events(self) -> List[Dict[str, Any]]:
        return self._events
