import time
from typing import Any, Dict, List
from app.knowledge.schemas import KnowledgeResponse
from app.knowledge.models import OperationalRule, OperationalPolicy
from app.knowledge.registry import knowledge_registry
from app.knowledge.manager import KnowledgeManager
from app.knowledge.decision_engine import DecisionSupportEngine
from app.knowledge.metrics import knowledge_metrics
from loguru import logger

class KnowledgeEngine:
    """
    Facade controller coordinating playbook retrieval searches and policy evaluations.
    """
    def __init__(self):
        self.manager = KnowledgeManager()
        self.decision_support = DecisionSupportEngine()

    def search_playbooks(self, query: str) -> List[dict]:
        ranked = self.manager.search_playbooks(query)
        # Format as list of dicts with match confidence
        return [
            {
                "rule": r.model_dump(),
                "confidence": score
            } for r, score in ranked
        ]

    def evaluate_policies(self, category: str, context: Dict[str, Any]) -> KnowledgeResponse:
        start_time = time.time()
        res = self.decision_support.compile_decision_support(category, context)
        
        duration = time.time() - start_time
        knowledge_metrics.record_evaluation(duration)
        return res

    def list_policies(self) -> List[OperationalPolicy]:
        return knowledge_registry.list_policies()

    def list_rules(self) -> List[OperationalRule]:
        return knowledge_registry.list_rules()


# Instantiate engine singleton
knowledge_engine = KnowledgeEngine()
