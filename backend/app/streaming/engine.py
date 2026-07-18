import asyncio
import uuid
from app.streaming.event_models import SystemEvent
from app.streaming.event_bus import EventBus
from app.streaming.history import EventHistoryBuffer
from app.streaming.connection_manager import WebSocketConnectionManager
from app.streaming.channel_manager import ChannelManager
from app.streaming.publisher import EventPublisher
from app.streaming.stream_manager import StreamBroadcastManager
from loguru import logger

class EventStreamingEngine:
    """
    Facade coordinating real-time event publishing, buffer logging, and broadcasts.
    """
    def __init__(self):
        self.queue = asyncio.Queue()
        self.bus = EventBus()
        self.history = EventHistoryBuffer()
        self.connections = WebSocketConnectionManager()
        self.channels = ChannelManager()
        self.publisher = EventPublisher(self.queue)
        self.broadcast_mgr = StreamBroadcastManager(
            self.queue, self.bus, self.history, self.connections
        )

    def initialize(self) -> None:
        logger.info("StreamingEngine: Initializing realtime publisher pipelines...")
        self.broadcast_mgr.start()

    async def shutdown(self) -> None:
        logger.info("StreamingEngine: Shutting down realtime publisher pipelines...")
        await self.broadcast_mgr.stop()

    def publish_event(
        self,
        event_type: str,
        source: str,
        payload: dict,
        priority: str = "LOW",
        correlation_id: str = None,
        mission_id: uuid.UUID = None,
        metadata: dict = None
    ) -> SystemEvent:
        return self.publisher.publish(
            event_type=event_type,
            source=source,
            payload=payload,
            priority=priority,
            correlation_id=correlation_id,
            mission_id=mission_id,
            metadata=metadata
        )

    def get_event_history(self) -> list[SystemEvent]:
        return self.history.get_recent()


# Instantiate engine singleton
event_streaming_engine = EventStreamingEngine()
