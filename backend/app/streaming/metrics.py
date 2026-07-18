from typing import List
from loguru import logger

class StreamingMetricsTracker:
    """
    Tracks broadcast latency averages, drop count telemetries.
    """
    def __init__(self):
        self._total_broadcasted: int = 0
        self._dropped: int = 0
        self._latencies: List[float] = []

    def record_broadcast(self, latency: float) -> None:
        self._total_broadcasted += 1
        self._latencies.append(latency)
        if len(self._latencies) > 1000:
            self._latencies.pop(0)

    def record_drop(self) -> None:
        self._dropped += 1
        logger.warning(f"StreamingMetrics: Event packet dropped. Total drops: {self._dropped}")

    def get_metrics_report(self) -> dict:
        total = len(self._latencies)
        avg = sum(self._latencies) / total if total > 0 else 0.0
        return {
            "total_broadcasted": self._total_broadcasted,
            "dropped_events": self._dropped,
            "average_broadcast_latency_seconds": round(avg, 6)
        }


# Instantiate metrics singleton
streaming_metrics = StreamingMetricsTracker()
