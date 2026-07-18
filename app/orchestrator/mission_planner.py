from typing import List, Tuple
from app.orchestrator.mission_models import MissionType
from loguru import logger

class MissionPlanner:
    """
    Decoupled planner mapping raw incident queries to collaborative agent groups.
    """
    def plan_mission(self, incident: str) -> Tuple[MissionType, List[str]]:
        logger.debug(f"MissionPlanner: Planning agent routing for query '{incident}'...")
        prompt_lower = incident.lower()
        
        # Determine Mission Type & Assigned Agents
        if "fire" in prompt_lower and "crowd" in prompt_lower:
            return MissionType.MULTIPLE, ["emergency", "crowd", "security"]
        
        if "fire" in prompt_lower:
            return MissionType.FIRE, ["emergency", "security"]
            
        if "medical" in prompt_lower:
            return MissionType.MEDICAL, ["emergency", "security"]
            
        if "crowd" in prompt_lower or "queue" in prompt_lower or "congestion" in prompt_lower:
            return MissionType.CROWD, ["crowd", "security"]
            
        if "bomb" in prompt_lower or "threat" in prompt_lower:
            return MissionType.BOMB_THREAT, ["emergency", "security", "crowd"]
            
        if "lost" in prompt_lower or "child" in prompt_lower:
            return MissionType.LOST_CHILD, ["security", "crowd"]
            
        if "vip" in prompt_lower:
            return MissionType.VIP_INCIDENT, ["emergency", "security"]
            
        if "gate" in prompt_lower and "breach" in prompt_lower:
            return MissionType.SECURITY, ["security", "crowd"]

        # Default fallback
        return MissionType.SECURITY, ["security"]
