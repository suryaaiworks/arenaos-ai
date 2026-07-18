from typing import List
from app.knowledge.models import OperationalPolicy
from app.knowledge.registry import knowledge_registry
from loguru import logger

class PolicyEngine:
    """
    Evaluates policy compliance rules.
    """
    def find_matching_policies(self, rule_titles: List[str]) -> List[OperationalPolicy]:
        logger.debug(f"PolicyEngine: Finding policies matching rules: {rule_titles}...")
        matched = []
        rule_set = {r.lower() for r in rule_titles}
        
        for policy in knowledge_registry.list_policies():
            policy_rules = {pr.lower() for pr in policy.rules}
            if rule_set.intersection(policy_rules):
                matched.append(policy)
                
        return matched
