from typing import Callable
from app.streaming.event_models import SystemEvent
from loguru import logger

class EventSubscriber:
    """
    Subscribes callbacks to system events notifications.
    """
    def __init__(self, topic: str, callback: Callable[[SystemEvent], None]):
        self.topic = topic
        self.callback = callback

    def notify(self, event: SystemEvent) -> None:
        try:
            self.callback(event)
        except Exception as e:
            logger.error(f"Subscriber: Notification callback failed: {e}")
