import time
from typing import Any, Dict
from app.orchestrator.mission_context import MissionContext
from app.orchestrator.mission_schemas import MissionStartRequest
from app.orchestrator.mission_state import MissionState
from app.orchestrator.mission_validator import MissionValidator
from app.orchestrator.mission_manager import MissionManager
from app.orchestrator.mission_executor import MissionExecutor
from app.orchestrator.mission_metrics import mission_metrics
from loguru import logger

class MissionOrchestrator:
    """
    Facade Orchestrator routing requests to MissionManagers, Planners, and Executors.
    """
    def __init__(self):
        self.validator = MissionValidator()
        self.manager = MissionManager()
        self.executor = MissionExecutor()

    async def orchestrate_mission(self, req: MissionStartRequest) -> MissionContext:
        start_time = time.time()
        success = False
        
        # 1. Validate payload parameters
        self.validator.validate_request(req)
        
        # 2. Create mission context record
        mission = self.manager.create_mission(req.incident, req.context)
        
        try:
            # 3. Transition to ASSIGNED
            self.manager.update_state(mission.mission_id, MissionState.ASSIGNED)
            
            # 4. Dispatch collaborative tasks
            await self.executor.execute_mission(
                mission=mission,
                incident=req.incident,
                session_id=req.session_id,
                context_dict=req.context
            )
            
            success = True
            duration = time.time() - start_time
            mission_metrics.record_mission(duration, success)
            return mission
            
        except Exception as e:
            duration = time.time() - start_time
            mission_metrics.record_mission(duration, False)
            self.manager.update_state(mission.mission_id, MissionState.FAILED)
            logger.exception(f"MissionOrchestrator: Execution failed: {e}")
            raise e


# Instantiate facade singleton
mission_orchestrator = MissionOrchestrator()
