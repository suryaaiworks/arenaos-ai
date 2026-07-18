from typing import Any, Dict, List
from app.memory.storage import MemoryStorageInterface
from app.memory.context import MemoryRecord
from loguru import logger

class ExecutionMemoryAdapter:
    """
    Manages tool execution history records.
    """
    def __init__(self, storage: MemoryStorageInterface):
        self.storage = storage

    async def log_tool_execution(self, execution_id: str, log_payload: Dict[str, Any]) -> None:
        key = f"tool_exec:{execution_id}"
        logger.debug(f"ExecutionMemory: Saving tool execution run logs under key '{key}'...")
        await self.storage.set(key, log_payload)

    async def get_tool_execution(self, execution_id: str) -> Dict[str, Any]:
        key = f"tool_exec:{execution_id}"
        return await self.storage.get(key) or {}
