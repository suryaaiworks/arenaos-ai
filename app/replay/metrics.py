from typing import List
from loguru import logger

class ReplayMetricsTracker:
    """
    Accumulates telemetry details regarding playback runs.
    """
    def __init__(self):
        self._total_replays: int = 0
        self._playback_times: List[float] = []

    def record_replay(self, duration: float) -> None:
        self._total_replays += 1
        self._playback_times.append(duration)
        logger.debug(f"ReplayMetrics: Logged replay run: {duration:.4f}s")

    def get_metrics_report(self) -> dict:
        total = len(self._playback_times)
        avg = sum(self._playback_times) / total if total > 0 else 0.0
        return {
            "total_replays_played": self._total_replays,
            "average_replay_duration_seconds": round(avg, 4)
        }


# Instantiate metrics tracker singleton
replay_metrics = ReplayMetricsTracker()
