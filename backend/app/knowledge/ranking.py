from typing import List, Tuple
from app.knowledge.models import OperationalRule
from loguru import logger

class KnowledgeRanker:
    """
    Ranks retrieved rules and calculates match confidence scores.
    """
    def rank_results(self, query: str, rules: List[OperationalRule]) -> List[Tuple[OperationalRule, float]]:
        logger.debug(f"KnowledgeRanker: Ranking {len(rules)} rules against query '{query}'...")
        if not query or not rules:
            return [(r, 1.0) for r in rules]
            
        ranked = []
        tokens = set(query.lower().split())
        for rule in rules:
            content_tokens = set(f"{rule.title} {rule.condition} {rule.action_playbook}".lower().split())
            intersection = tokens.intersection(content_tokens)
            
            # Simple Jaccard similarity score
            union = tokens.union(content_tokens)
            score = len(intersection) / len(union) if union else 0.0
            
            # Ensure a minimal base score for partial overlaps
            confidence = max(0.5, round(score * 2.0, 2))
            ranked.append((rule, min(1.0, confidence)))
            
        ranked.sort(key=lambda x: x[1], reverse=True)
        return ranked
