import uuid
from typing import Dict, Optional
from app.replay.schemas import ReplayReport
from app.replay.models import ReplayState
from loguru import logger

class ReplayRegistry:
    """
    Registry database tracking active playback sessions in memory.
    """
    def __init__(self):
        self._replays: Dict[uuid.UUID, ReplayReport] = {}

    def register_replay(self, replay: ReplayReport) -> None:
        self._replays[replay.replay_id] = replay
        logger.debug(f"ReplayRegistry: Registered playback session '{replay.replay_id}'")

    def get_replay(self, replay_id: uuid.UUID) -> Optional[ReplayReport]:
        return self._replays.get(replay_id)

    def get_by_mission(self, mission_id: uuid.UUID) -> Optional[ReplayReport]:
        for rep in self._replays.values():
            if rep.mission_id == mission_id:
                return rep
        return None

    def list_replays(self) -> Dict[uuid.UUID, ReplayReport]:
        return self._replays


# Instantiate registry singleton
replay_registry = ReplayRegistry()
