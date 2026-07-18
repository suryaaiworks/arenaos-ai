from fastapi import WebSocket
from typing import Dict, List, Set
from loguru import logger

class WebSocketConnectionManager:
    """
    Manages active WebSocket connection streams, channel subscriptions, and broadcasts.
    """
    def __init__(self):
        self._active_connections: Set[WebSocket] = set()
        self._subscriptions: Dict[WebSocket, Set[str]] = {}

    async def connect(self, websocket: WebSocket) -> None:
        await websocket.accept()
        self._active_connections.add(websocket)
        self._subscriptions[websocket] = {"*"} # Default listen to all topics
        logger.info(f"ConnManager: New client connection accepted. Active connections count: {len(self._active_connections)}")

    def disconnect(self, websocket: WebSocket) -> None:
        self._active_connections.discard(websocket)
        self._subscriptions.pop(websocket, None)
        logger.info(f"ConnManager: Client disconnected. Active connections remaining: {len(self._active_connections)}")

    def subscribe(self, websocket: WebSocket, topic: str) -> None:
        if websocket in self._subscriptions:
            self._subscriptions[websocket].add(topic)
            logger.debug(f"ConnManager: Client subscribed to topic '{topic}'")

    def unsubscribe(self, websocket: WebSocket, topic: str) -> None:
        if websocket in self._subscriptions:
            self._subscriptions[websocket].discard(topic)
            logger.debug(f"ConnManager: Client unsubscribed from topic '{topic}'")

    def get_subscriptions(self, websocket: WebSocket) -> Set[str]:
        return self._subscriptions.get(websocket, set())

    def get_active_websockets(self) -> Set[WebSocket]:
        return self._active_connections
