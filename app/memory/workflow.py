from typing import Any, Dict, List
from app.memory.storage import MemoryStorageInterface
from app.memory.context import MemoryRecord
from loguru import logger

class WorkflowMemoryAdapter:
    """
    Manages active workflow steps state memory storage context.
    """
    def __init__(self, storage: MemoryStorageInterface):
        self.storage = storage

    async def store_workflow_state(self, workflow_id: str, state: Dict[str, Any]) -> None:
        key = f"workflow_state:{workflow_id}"
        logger.debug(f"WorkflowMemory: Saving workflow step progress for key '{key}'...")
        await self.storage.set(key, state)

    async def retrieve_workflow_state(self, workflow_id: str) -> Dict[str, Any]:
        key = f"workflow_state:{workflow_id}"
        logger.debug(f"WorkflowMemory: Loading workflow step progress for key '{key}'...")
        return await self.storage.get(key) or {}
