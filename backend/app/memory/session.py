from typing import Any, Dict, List
from app.memory.storage import MemoryStorageInterface
from app.memory.context import MemoryRecord
from loguru import logger

class SessionMemoryAdapter:
    """
    Manages active user session memory context mapped to the memory storage interface.
    """
    def __init__(self, storage: MemoryStorageInterface):
        self.storage = storage

    async def store_session_context(self, session_id: str, context: Dict[str, Any]) -> None:
        key = f"session_ctx:{session_id}"
        logger.debug(f"SessionMemory: Saving session context key '{key}'...")
        await self.storage.set(key, context)

    async def retrieve_session_context(self, session_id: str) -> Dict[str, Any]:
        key = f"session_ctx:{session_id}"
        logger.debug(f"SessionMemory: Fetching session context key '{key}'...")
        return await self.storage.get(key) or {}

    async def list_active_sessions(self) -> List[str]:
        # We store list of active session IDs under a specific register
        return await self.storage.get("active_session_ids") or []

    async def register_session(self, session_id: str) -> None:
        sessions = await self.storage.get("active_session_ids") or []
        if session_id not in sessions:
            sessions.append(session_id)
            await self.storage.set("active_session_ids", sessions)
