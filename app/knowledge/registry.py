from typing import Dict, List, Optional
from app.knowledge.models import OperationalRule, OperationalPolicy
from app.knowledge.sources import get_stadium_rules, get_stadium_policies
from loguru import logger

class KnowledgeRegistry:
    """
    Registers and tracks stadium operational rules and policy definitions.
    """
    def __init__(self):
        self._rules: Dict[str, OperationalRule] = {}
        self._policies: Dict[str, OperationalPolicy] = {}
        self._load_default_sources()

    def _load_default_sources(self) -> None:
        logger.info("KnowledgeRegistry: Loading default operational rules and policies...")
        for r in get_stadium_rules():
            self.register_rule(r)
        for p in get_stadium_policies():
            self.register_policy(p)

    def register_rule(self, rule: OperationalRule) -> None:
        self._rules[rule.title.lower()] = rule
        logger.debug(f"KnowledgeRegistry: Registered rule '{rule.title}'")

    def register_policy(self, policy: OperationalPolicy) -> None:
        self._policies[policy.title.lower()] = policy
        logger.debug(f"KnowledgeRegistry: Registered policy '{policy.title}'")

    def get_rule(self, title: str) -> Optional[OperationalRule]:
        return self._rules.get(title.lower())

    def get_policy(self, title: str) -> Optional[OperationalPolicy]:
        return self._policies.get(title.lower())

    def list_rules(self) -> List[OperationalRule]:
        return list(self._rules.values())

    def list_policies(self) -> List[OperationalPolicy]:
        return list(self._policies.values())


# Instantiate registry singleton
knowledge_registry = KnowledgeRegistry()
