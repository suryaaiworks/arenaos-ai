import time
import uuid
from app.streaming.event_models import SystemEvent
from loguru import logger

class EventPublisher:
    """
    Convenience interface wrapping client-side publish commands.
    """
    def __init__(self, queue: Any = None):
        self._queue = queue

    def set_queue(self, queue) -> None:
        self._queue = queue

    def publish(
        self,
        event_type: str,
        source: str,
        payload: dict,
        priority: str = "LOW",
        correlation_id: str = None,
        mission_id: uuid.UUID = None,
        metadata: dict = None
    ) -> SystemEvent:
        event = SystemEvent(
            event_type=event_type,
            source=source,
            priority=priority,
            payload=payload,
            correlation_id=correlation_id,
            mission_id=mission_id,
            metadata=metadata or {}
        )
        
        if self._queue:
            self._queue.put_nowait(event)
            logger.debug(f"Publisher: Queued event '{event.event_id}' for distribution.")
        else:
            logger.warning(f"Publisher: Streaming engine queue is unlinked. Dropping event '{event.event_id}'.")
            
        return event


# Use dynamic type hinting for set_queue support
from typing import Any
