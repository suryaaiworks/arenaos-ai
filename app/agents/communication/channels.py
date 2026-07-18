import asyncio
from typing import Callable, List
from app.agents.communication.messages import Message
from loguru import logger

class MessageChannel:
    """
    Publish/Subscribe message channel mapping communications between agents.
    """
    def __init__(self, name: str):
        self.name = name
        self._subscribers: List[Callable[[Message], None]] = []

    def subscribe(self, callback: Callable[[Message], None]) -> None:
        self._subscribers.append(callback)
        logger.debug(f"MessageChannel [{self.name}]: Subscribed callback listener.")

    def publish(self, message: Message) -> None:
        logger.debug(f"MessageChannel [{self.name}]: Publishing message ID {message.message_id}")
        for sub in self._subscribers:
            try:
                sub(message)
            except Exception as e:
                logger.error(f"MessageChannel [{self.name}]: Callback error: {e}")
