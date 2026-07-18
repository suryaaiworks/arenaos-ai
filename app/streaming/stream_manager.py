import asyncio
from app.streaming.event_models import SystemEvent
from app.streaming.event_bus import EventBus
from app.streaming.history import EventHistoryBuffer
from app.streaming.connection_manager import WebSocketConnectionManager
from loguru import logger

class StreamBroadcastManager:
    """
    Spawns and monitors async broadcast loops dispatching event packets.
    """
    def __init__(
        self,
        queue: asyncio.Queue,
        bus: EventBus,
        history: EventHistoryBuffer,
        connection_mgr: WebSocketConnectionManager
    ):
        self.queue = queue
        self.bus = bus
        self.history = history
        self.connection_mgr = connection_mgr
        self._running_task: asyncio.Task = None

    def start(self) -> None:
        logger.info("StreamManager: Starting background events broadcast task loop...")
        self._running_task = asyncio.create_task(self._broadcast_loop())

    async def stop(self) -> None:
        if self._running_task:
            logger.info("StreamManager: Stopping background broadcast task loop...")
            self._running_task.cancel()
            try:
                await self._running_task
            except asyncio.CancelledError:
                pass

    async def _broadcast_loop(self) -> None:
        while True:
            try:
                # Wait for next event
                event: SystemEvent = await self.queue.get()
                
                # Append to history buffer
                self.history.append(event)
                
                # Broadcast via EventBus to active WebSockets
                connections = self.connection_mgr.get_active_websockets()
                subscriptions = {ws: self.connection_mgr.get_subscriptions(ws) for ws in connections}
                
                await self.bus.broadcast_event(event, connections, subscriptions)
                self.queue.task_done()
                
            except asyncio.CancelledError:
                break
            except Exception as loop_err:
                logger.exception(f"StreamManager: Broadcast loop encountered error: {loop_err}")
                await asyncio.sleep(1) # Back off to avoid tight loop
