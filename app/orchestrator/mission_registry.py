import uuid
from typing import Dict, Optional
from app.orchestrator.mission_context import MissionContext
from loguru import logger

class MissionRegistry:
    """
    Registry database tracking active multi-agent collaborative missions.
    """
    def __init__(self):
        self._missions: Dict[uuid.UUID, MissionContext] = {}

    def register_mission(self, mission: MissionContext) -> None:
        self._missions[mission.mission_id] = mission
        logger.debug(f"MissionRegistry: Registered mission '{mission.mission_id}' under type '{mission.mission_type}'")

    def get_mission(self, mission_id: uuid.UUID) -> Optional[MissionContext]:
        return self._missions.get(mission_id)

    def list_missions(self) -> Dict[uuid.UUID, MissionContext]:
        return self._missions


# Instantiate registry singleton
mission_registry = MissionRegistry()
