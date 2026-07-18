from typing import Any, Dict, List
from loguru import logger

class MemoryRankingStrategy:
    """
    Computes keyword matching overlaps to score and rank retrieved memories.
    """
    def rank_memories(self, query: str, records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        logger.debug(f"RankingStrategy: Relevance-scoring retrieved list against query '{query}'...")
        
        scored = []
        query_words = set(query.lower().split())
        
        for record in records:
            content_str = str(record.get("content", "")).lower()
            score = 0.0
            
            # Simple keyword matching overlaps
            for qw in query_words:
                if qw in content_str:
                    score += 1.0
                    
            record_copy = dict(record)
            record_copy["relevance_score"] = score
            scored.append(record_copy)

        # Sort by score descending
        scored.sort(key=lambda r: r.get("relevance_score", 0.0), reverse=True)
        return scored
