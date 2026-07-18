from typing import List, Tuple
from app.knowledge.models import OperationalRule
from app.knowledge.registry import knowledge_registry
from app.knowledge.retrieval import KnowledgeRetriever
from app.knowledge.ranking import KnowledgeRanker
from app.knowledge.metrics import knowledge_metrics
from loguru import logger

class KnowledgeManager:
    """
    Coordinates searches and ranking retrievals of operational playbooks.
    """
    def __init__(self):
        self.retriever = KnowledgeRetriever()
        self.ranker = KnowledgeRanker()

    def search_playbooks(self, query: str) -> List[Tuple[OperationalRule, float]]:
        logger.info(f"KnowledgeManager: Searching playbooks catalog for: '{query}'...")
        knowledge_metrics.record_search()
        
        # 1. Retrieve candidates
        candidates = self.retriever.search_rules(query)
        
        # 2. Rank candidates
        return self.ranker.rank_results(query, candidates)
