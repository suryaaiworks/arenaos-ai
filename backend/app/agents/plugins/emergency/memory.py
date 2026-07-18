from typing import Any, Dict, List
from app.memory.engine import memory_engine
from app.memory.context import MemoryRecord
from loguru import logger

class EmergencyAgentMemoryBridge:
    """
    Binds EmergencyAgent state updates, timeline milestones, and reports to the central Memory Engine.
    """
    async def save_emergency_report(self, session_id: str, report_dict: Dict[str, Any]) -> None:
        logger.debug(f"EmergencyMemory: Logging emergency coordination findings for session '{session_id}'...")
        record = MemoryRecord(
            session_id=session_id,
            memory_type="long_term",
            content=report_dict,
            metadata={"source": "EmergencyAgent", "category": "emergency_evac_audit"}
        )
        await memory_engine.store_memory(record)

    async def get_previous_emergency_reports(self, session_id: str) -> List[MemoryRecord]:
        logger.debug(f"EmergencyMemory: Loading persistent logs for session '{session_id}'...")
        return await memory_engine.retrieve_memories(session_id, "long_term")
