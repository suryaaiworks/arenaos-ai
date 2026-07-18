import uuid
from typing import Any, Dict, List
from app.knowledge.schemas import KnowledgeResponse
from app.knowledge.rule_engine import RuleEngine
from app.knowledge.policy_engine import PolicyEngine
from loguru import logger

class DecisionSupportEngine:
    """
    Synthesizes active rules and policies evaluations to compile structured decisions.
    """
    def __init__(self):
        self.rule_engine = RuleEngine()
        self.policy_engine = PolicyEngine()

    def compile_decision_support(self, category: str, context: Dict[str, Any]) -> KnowledgeResponse:
        logger.info(f"DecisionEngine: Compiling decisions support parameters for category '{category}'...")
        
        # 1. Evaluate rules
        rules = self.rule_engine.evaluate_rules(category, context)
        rule_titles = [r.title for r in rules]
        playbooks = [r.action_playbook for r in rules]
        
        # 2. Find matching policies
        policies = self.policy_engine.find_matching_policies(rule_titles)
        policy_titles = [p.title for p in policies]
        
        # 3. Formulate summary
        if playbooks:
            summary = f"Evaluated category '{category}' rules. Recommendations: " + " | ".join(playbooks)
        else:
            summary = f"Evaluated category '{category}' rules. No playbook conditions were triggered. Maintain default monitoring."
            playbooks = ["Maintain standard surveillance guidelines"]
            
        return KnowledgeResponse(
            knowledge_id=uuid.uuid4(),
            matched_policies=policy_titles,
            matched_rules=rule_titles,
            confidence=1.0 if rules else 0.5,
            recommendations=playbooks,
            decision_summary=summary,
            metadata={"context": context}
        )
