from typing import Any, Dict, List
from app.memory.engine import memory_engine
from app.memory.context import MemoryRecord
from loguru import logger

class SecurityAgentMemoryBridge:
    """
    Binds SecurityAgent state updates, decisions, and report outcomes to the central Memory Engine.
    """
    async def save_incident_report(self, session_id: str, report_dict: Dict[str, Any]) -> None:
        logger.debug(f"SecurityMemory: Logging analysis findings for session '{session_id}'...")
        record = MemoryRecord(
            session_id=session_id,
            memory_type="long_term",
            content=report_dict,
            metadata={"source": "SecurityAgent", "category": "surveillance_audit"}
        )
        await memory_engine.store_memory(record)

    async def get_previous_incidents(self, session_id: str) -> List[MemoryRecord]:
        logger.debug(f"SecurityMemory: Loading persistent logs for session '{session_id}'...")
        return await memory_engine.retrieve_memories(session_id, "long_term")
