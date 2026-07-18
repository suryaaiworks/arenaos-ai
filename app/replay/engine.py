import time
import uuid
from app.replay.schemas import ReplayStartRequest, ReplayReport
from app.replay.replay_registry import replay_registry
from app.replay.replay_manager import ReplayManager
from app.replay.metrics import replay_metrics
from loguru import logger

class IncidentReplayEngine:
    """
    Facade controller coordinating replay lifecycles and timelines sequence builders.
    """
    def __init__(self):
        self.manager = ReplayManager()

    async def initiate_replay(self, req: ReplayStartRequest) -> ReplayReport:
        logger.info(f"ReplayEngine: Start request received for mission '{req.mission_id}'...")
        start_time = time.time()
        
        try:
            report = await self.manager.create_replay_session(req)
            
            # Auto play
            self.manager.start_playback(report.replay_id)
            
            duration = time.time() - start_time
            replay_metrics.record_replay(duration)
            return report
            
        except Exception as e:
            logger.exception(f"ReplayEngine: Failed run execution: {e}")
            raise e


# Instantiate engine singleton
incident_replay_engine = IncidentReplayEngine()
