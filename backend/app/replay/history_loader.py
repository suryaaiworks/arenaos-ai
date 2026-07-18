import uuid
from typing import Any, Dict, List
from app.memory.engine import memory_engine
from app.streaming.engine import event_streaming_engine
from loguru import logger

class ReplayHistoryLoader:
    """
    Loads completed incident coordination timeline logs from Memory and Streaming databases.
    """
    async def load_mission_context(self, mission_id: uuid.UUID) -> Dict[str, Any]:
        logger.debug(f"HistoryLoader: Pulling mission context for '{mission_id}' from MemoryEngine...")
        records = await memory_engine.retrieve_memories(str(mission_id), "long_term")
        if records:
            # Return first record content dict
            return records[0].content
        raise ValueError(f"No mission record history found matching ID: {mission_id}")

    def load_stream_events(self, mission_id: uuid.UUID) -> List[Dict[str, Any]]:
        logger.debug(f"HistoryLoader: Pulling stream events for mission '{mission_id}'...")
        recent = event_streaming_engine.get_event_history()
        # Filter matching mission_id
        return [e.model_dump() for e in recent if e.mission_id == mission_id]
