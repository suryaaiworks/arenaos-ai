import asyncio
import time
from typing import List, Set
from fastapi import WebSocket
from app.streaming.event_models import SystemEvent
from app.streaming.serializer import EventSerializer
from app.streaming.filters import EventFilter
from app.streaming.metrics import streaming_metrics
from loguru import logger

class EventBus:
    """
    Distributes events dynamically to active subscriber clients via WebSockets.
    """
    def __init__(self):
        self._serializer = EventSerializer()
        self._filter = EventFilter()

    async def broadcast_event(self, event: SystemEvent, connections: Set[WebSocket], subscriptions: dict) -> None:
        start_time = time.time()
        payload_str = self._serializer.serialize(event.model_dump())
        
        # Broadcast to matching subscribers
        sent_count = 0
        for ws in list(connections):
            topics = subscriptions.get(ws, {"*"})
            
            # Check if event matches subscriber topic filters
            matches_filter = False
            for topic in topics:
                if self._filter.matches(event, topic):
                    matches_filter = True
                    break
                    
            if matches_filter:
                try:
                    await ws.send_text(payload_str)
                    sent_count += 1
                except Exception as ws_err:
                    logger.debug(f"EventBus: Send failed for client. Connection likely severed: {ws_err}")
                    
        latency = time.time() - start_time
        streaming_metrics.record_broadcast(latency)
        logger.debug(f"EventBus: Broadcasted event '{event.event_type}' to {sent_count} clients in {latency:.6f}s")
