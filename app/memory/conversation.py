from typing import Any, Dict, List
from app.memory.storage import MemoryStorageInterface
from app.memory.context import MemoryRecord
from loguru import logger

class ConversationMemoryAdapter:
    """
    Manages conversation turns messages list sequencing.
    """
    def __init__(self, storage: MemoryStorageInterface):
        self.storage = storage

    async def add_message(self, session_id: str, message: Dict[str, Any]) -> None:
        key = f"conversation_history:{session_id}"
        logger.debug(f"ConversationMemory: Appending turn to history for session '{session_id}'...")
        history = await self.storage.get(key) or []
        history.append(message)
        await self.storage.set(key, history)

    async def get_history(self, session_id: str) -> List[Dict[str, Any]]:
        key = f"conversation_history:{session_id}"
        logger.debug(f"ConversationMemory: Retrieving history for session '{session_id}'...")
        return await self.storage.get(key) or []

    async def clear_history(self, session_id: str) -> None:
        key = f"conversation_history:{session_id}"
        logger.debug(f"ConversationMemory: Clearing history for session '{session_id}'...")
        await self.storage.delete(key)
        
        # Clear context as well
        ctx_key = f"session_ctx:{session_id}"
        await self.storage.delete(ctx_key)
