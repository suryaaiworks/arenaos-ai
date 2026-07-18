from typing import Any, Dict, List
from app.memory.engine import memory_engine
from app.memory.context import MemoryRecord
from loguru import logger

class CrowdAgentMemoryBridge:
    """
    Binds CrowdAgent state updates, congestion trends, and reports to the central Memory Engine.
    """
    async def save_crowd_report(self, session_id: str, report_dict: Dict[str, Any]) -> None:
        logger.debug(f"CrowdMemory: Logging crowd intelligence findings for session '{session_id}'...")
        record = MemoryRecord(
            session_id=session_id,
            memory_type="long_term",
            content=report_dict,
            metadata={"source": "CrowdAgent", "category": "crowd_density_audit"}
        )
        await memory_engine.store_memory(record)

    async def get_previous_density_reports(self, session_id: str) -> List[MemoryRecord]:
        logger.debug(f"CrowdMemory: Loading persistent logs for session '{session_id}'...")
        return await memory_engine.retrieve_memories(session_id, "long_term")
