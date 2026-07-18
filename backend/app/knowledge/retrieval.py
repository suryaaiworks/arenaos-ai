from typing import List
from app.knowledge.models import OperationalRule
from app.knowledge.registry import knowledge_registry
from loguru import logger

class KnowledgeRetriever:
    """
    Retrieves operational rules matching keywords query bounds.
    """
    def search_rules(self, query: str) -> List[OperationalRule]:
        logger.debug(f"KnowledgeRetriever: Searching rules for query: '{query}'...")
        if not query:
            return knowledge_registry.list_rules()
            
        matches = []
        tokens = query.lower().split()
        for rule in knowledge_registry.list_rules():
            # Check overlap in title, condition, and action playbook
            content = f"{rule.title} {rule.condition} {rule.action_playbook}".lower()
            score = sum(1 for token in tokens if token in content)
            if score > 0:
                matches.append((rule, score))
                
        # Sort by match score
        matches.sort(key=lambda x: x[1], reverse=True)
        return [item[0] for item in matches]
