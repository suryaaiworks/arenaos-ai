from typing import List
from loguru import logger

class MissionMetricsTracker:
    """
    Accumulates telemetry details regarding mission collaborative runs.
    """
    def __init__(self):
        self._total_missions: int = 0
        self._failures: int = 0
        self._execution_times: List[float] = []

    def record_mission(self, duration: float, success: bool) -> None:
        self._total_missions += 1
        if success:
            self._execution_times.append(duration)
        else:
            self._failures += 1
        logger.debug(f"MissionMetrics: Logged mission run: {duration:.4f}s | Success: {success}")

    def get_metrics_report(self) -> dict:
        total = len(self._execution_times)
        avg = sum(self._execution_times) / total if total > 0 else 0.0
        return {
            "total_missions_started": self._total_missions,
            "missions_failed": self._failures,
            "average_mission_duration_seconds": round(avg, 4)
        }


# Instantiate metrics tracker singleton
mission_metrics = MissionMetricsTracker()
