import uuid
from app.orchestrator.mission_state import MissionState
from loguru import logger

class MissionEventsPublisher:
    """
    Publishes signal events when collaborative mission states transit.
    """
    def publish_state_transition(self, mission_id: uuid.UUID, old_state: MissionState, new_state: MissionState) -> None:
        logger.info(f"MissionEvents: Mission '{mission_id}' transited state from '{old_state}' to '{new_state}'")
