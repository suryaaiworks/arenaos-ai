import uuid
from typing import Any, Dict
from app.orchestrator.mission_context import MissionContext
from app.orchestrator.mission_state import MissionState
from app.orchestrator.mission_registry import mission_registry
from app.orchestrator.mission_planner import MissionPlanner
from app.orchestrator.mission_events import MissionEventsPublisher
from loguru import logger

class MissionManager:
    """
    Manages mission lifecycles and state transitions.
    """
    def __init__(self):
        self.planner = MissionPlanner()
        self.events_publisher = MissionEventsPublisher()

    def create_mission(self, incident: str, metadata: Dict[str, Any] = None) -> MissionContext:
        mission_id = uuid.uuid4()
        logger.info(f"MissionManager: Initiating collaborative mission '{mission_id}'...")
        
        # Determine plan
        m_type, agents = self.planner.plan_mission(incident)
        
        mission = MissionContext(
            mission_id=mission_id,
            mission_type=m_type,
            status=MissionState.CREATED,
            participating_agents=agents,
            timeline=[f"{mission_id} - Mission record created"],
            metadata=metadata or {}
        )
        
        mission_registry.register_mission(mission)
        self.events_publisher.publish_state_transition(mission_id, MissionState.CREATED, MissionState.PLANNING)
        mission.status = MissionState.PLANNING
        
        return mission

    def update_state(self, mission_id: uuid.UUID, next_state: MissionState) -> None:
        mission = mission_registry.get_mission(mission_id)
        if mission:
            old_state = mission.status
            mission.status = next_state
            self.events_publisher.publish_state_transition(mission_id, old_state, next_state)
