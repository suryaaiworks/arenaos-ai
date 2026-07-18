import time
from typing import Dict, Any, List
from app.replay.schemas import ReplayReport
from app.replay.models import ReplayState
from app.replay.event_player import EventPlayer
from loguru import logger

class ReplayExecutor:
    """
    Coordinates playback loops execution threads.
    """
    def __init__(self):
        self._active_players: Dict[uuid.UUID, EventPlayer] = {}

    def start_playback(self, replay: ReplayReport, event_sequence: List[Dict[str, Any]]) -> None:
        logger.info(f"ReplayExecutor: Starting playback thread for session '{replay.replay_id}'...")
        
        player = EventPlayer(replay.replay_id, replay.speed)
        self._active_players[replay.replay_id] = player
        
        replay.status = ReplayState.PLAYING
        player.start_playback(event_sequence)

    def pause_playback(self, replay_id: uuid.UUID) -> None:
        player = self._active_players.get(replay_id)
        if player:
            player.pause()
            logger.info(f"ReplayExecutor: Paused playback thread '{replay_id}'.")

    def remove_player(self, replay_id: uuid.UUID) -> None:
        self._active_players.pop(replay_id, None)


# Instantiate uuid for type hint
import uuid
