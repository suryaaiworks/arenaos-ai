from typing import Any, Callable, Dict, List
from loguru import logger

class EventBus:
    """
    In-memory publish/subscribe Event Bus for ArenaMind orchestrator notifications.
    Supports decoupled telemetry logs collection without external brokers.
    """
    def __init__(self):
        self._listeners: Dict[str, List[Callable[[Any], None]]] = {}

    def subscribe(self, event_type: str, callback: Callable[[Any], None]) -> None:
        """
        Subscribes a listener callback to an event channel.
        """
        if event_type not in self._listeners:
            self._listeners[event_type] = []
        self._listeners[event_type].append(callback)
        logger.debug(f"EventBus: Subscribed callback to event type channel: '{event_type}'")

    def publish(self, event_type: str, payload: Any) -> None:
        """
        Fires listener callbacks registered for this event type.
        """
        logger.debug(f"EventBus: Publishing event type: '{event_type}'")
        if event_type in self._listeners:
            for callback in self._listeners[event_type]:
                try:
                    callback(payload)
                except Exception as e:
                    logger.error(f"EventBus: Listener callback error on channel '{event_type}': {e}")


# Instantiate EventBus singleton
event_bus = EventBus()
