from typing import Any, Dict, List
from app.knowledge.models import OperationalRule
from app.knowledge.registry import knowledge_registry
from loguru import logger

class RuleEngine:
    """
    Evaluates condition rules against input contexts.
    """
    def evaluate_rules(self, category: str, context: Dict[str, Any]) -> List[OperationalRule]:
        logger.debug(f"RuleEngine: Evaluating rules for category '{category}'...")
        triggered = []
        
        # Filter rules by category
        rules = [r for r in knowledge_registry.list_rules() if r.category.lower() == category.lower()]
        
        # Parse context factors
        severity = str(context.get("severity", "LOW")).upper()
        proximity = str(context.get("proximity", "LOW")).upper()
        occupancy = float(context.get("occupancy_rate", context.get("density", 0.0)))
        
        for rule in rules:
            triggered_rule = False
            
            # Simple condition matching evaluations
            if rule.title == "Fire Containment Protocol" and "fire" in str(context.get("incident", "")).lower():
                triggered_rule = True
            elif rule.title == "Zone Evacuation SOP" and severity in ["CRITICAL", "HIGH"]:
                triggered_rule = True
            elif rule.title == "Intrusion & Gate Breach SOP" and "breach" in str(context.get("incident", "")).lower():
                triggered_rule = True
            elif rule.title == "Crowd Density Mitigation Rule" and occupancy >= 0.9:
                triggered_rule = True
            elif rule.title == "VIP Area Protection Protocol" and proximity == "HIGH":
                triggered_rule = True
            elif rule.title == "VIP Medical Response SOP" and "medical" in str(context.get("incident", "")).lower():
                triggered_rule = True
            elif rule.title == "Lost Child Matching Protocol" and "child" in str(context.get("incident", "")).lower():
                triggered_rule = True
            elif rule.title == "Bomb Threat SOP" and "bomb" in str(context.get("incident", "")).lower():
                triggered_rule = True
            elif rule.title == "Threat Level Categorization SOP" and severity in ["HIGH", "CRITICAL"]:
                triggered_rule = True
                
            if triggered_rule:
                triggered.append(rule)
                logger.debug(f"RuleEngine: Rule '{rule.title}' condition met.")
                
        return triggered
