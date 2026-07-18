from typing import Any, Dict, List
from app.memory.ranking import MemoryRankingStrategy
from app.memory.context import MemoryRecord
from loguru import logger

class MemoryRetrievalSystem:
    """
    Coordinates multi-layer searches across short-term, long-term, and session caches,
    ranking outcomes based on strategies rules.
    """
    def __init__(self):
        self._ranker = MemoryRankingStrategy()

    async def search_and_rank(self, query: str, memories: List[MemoryRecord], limit: int = 5) -> List[MemoryRecord]:
        logger.debug(f"RetrievalSystem: Processing search queries for '{query}' across {len(memories)} entries...")
        if not memories:
            return []

        # Convert to dict for ranking processing
        dumps = [m.model_dump() for m in memories]
        ranked_dumps = self._ranker.rank_memories(query, dumps)
        
        # Take up to limit and rebuild Pydantic models
        results = []
        for r_dict in ranked_dumps[:limit]:
            # Retain computed score in metadata
            meta = r_dict.get("metadata", {})
            meta["relevance_score"] = r_dict.get("relevance_score", 0.0)
            r_dict["metadata"] = meta
            results.append(MemoryRecord(**r_dict))
            
        logger.debug(f"RetrievalSystem: Extracted {len(results)} ranked matches.")
        return results
