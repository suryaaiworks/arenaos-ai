from typing import Any, Dict, List
from app.memory.storage import MemoryStorageInterface
from app.memory.context import MemoryRecord
from loguru import logger

class LongTermMemoryAdapter:
    """
    Manages long-term persistence memory registers mapped to the memory storage interface.
    """
    def __init__(self, storage: MemoryStorageInterface):
        self.storage = storage

    async def store_memory(self, record: MemoryRecord) -> None:
        key = f"long_term:{record.session_id}:{record.memory_id}"
        logger.debug(f"LongTerm: Storing persistent record under key '{key}'...")
        await self.storage.set(key, record.model_dump())

    async def retrieve_memories(self, session_id: str) -> List[MemoryRecord]:
        session_key = f"long_term:list:{session_id}"
        records_dump = await self.storage.get(session_key) or []
        return [MemoryRecord(**r) for r in records_dump]

    async def add_to_session(self, session_id: str, record: MemoryRecord) -> None:
        session_key = f"long_term:list:{session_id}"
        records_dump = await self.storage.get(session_key) or []
        records_dump.append(record.model_dump())
        await self.storage.set(session_key, records_dump)
