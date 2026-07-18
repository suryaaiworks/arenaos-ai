import asyncio
from typing import Dict, Any, List
from app.replay.models import ReplayState, PlaySpeed
from loguru import logger

class EventPlayer:
    """
    Drives event step ticks looping during active playback sessions.
    """
    def __init__(self, replay_id, speed: PlaySpeed):
        self.replay_id = replay_id
        self.speed = speed
        self._current_step = 0
        self._task: asyncio.Task = None

    def start_playback(self, events: List[Dict[str, Any]]) -> None:
        logger.info(f"EventPlayer: Spawning playback execution task for session '{self.replay_id}'...")
        self._task = asyncio.create_task(self._play_loop(events))

    def pause(self) -> None:
        if self._task:
            self._task.cancel()
            logger.info("EventPlayer: Playback loop paused.")

    async def _play_loop(self, events: List[Dict[str, Any]]) -> None:
        tick_delay = 1.0
        if self.speed == PlaySpeed.FAST:
            tick_delay = 0.5
        elif self.speed == PlaySpeed.SUPER_FAST:
            tick_delay = 0.25
            
        while self._current_step < len(events):
            try:
                event = events[self._current_step]
                logger.debug(f"EventPlayer [{self.replay_id}]: Replaying step {self._current_step} - {event['event_type']}")
                
                # Yield control/sleep
                await asyncio.sleep(tick_delay)
                self._current_step += 1
            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.error(f"EventPlayer: Tick execution error: {e}")
                break
