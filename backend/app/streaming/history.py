from typing import List
from app.streaming.event_models import SystemEvent
from loguru import logger

class EventHistoryBuffer:
    """
    In-memory rolling history buffer enabling event replays.
    """
    def __init__(self, capacity: int = 100):
        self._capacity = capacity
        self._history: List[SystemEvent] = []

    def append(self, event: SystemEvent) -> None:
        self._history.append(event)
        if len(self._history) > self._capacity:
            self._history.pop(0)
        logger.debug(f"EventHistory: Buffered event '{event.event_id}'. History count: {len(self._history)}")

    def get_recent(self) -> List[SystemEvent]:
        return self._history

    def get_by_mission(self, mission_id) -> List[SystemEvent]:
        return [e for e in self._history if e.mission_id == mission_id]
