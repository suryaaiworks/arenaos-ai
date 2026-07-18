from typing import Any, Callable, Dict, List
from loguru import logger

class EventSystem:
    """
    Publish/Subscribe internal event broker emitter.
    """
    def __init__(self):
        self._subscribers: Dict[str, List[Callable]] = {}

    def subscribe(self, event_type: str, callback: Callable) -> None:
        key = event_type.strip().lower()
        if key not in self._subscribers:
            self._subscribers[key] = []
        self._subscribers[key].append(callback)
        logger.info(f"EventSystem: Hooked subscription callback for event type '{event_type}'")

    def publish(self, event_type: str, payload: Any) -> None:
        key = event_type.strip().lower()
        callbacks = self._subscribers.get(key, [])
        logger.debug(f"EventSystem: Publishing event '{event_type}' to {len(callbacks)} listeners...")
        for callback in callbacks:
            try:
                callback(payload)
            except Exception as e:
                logger.error(f"EventSystem: Listener callback error for '{event_type}': {e}")
