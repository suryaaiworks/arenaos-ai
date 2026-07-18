from typing import Dict
from loguru import logger

class CommMetricsTracker:
    """
    Accumulates telemetry counters for inter-agent messages.
    """
    def __init__(self):
        self._sent_count: int = 0
        self._received_count: int = 0
        self._failures: int = 0
        self._dlq_count: int = 0
        self._broadcast_count: int = 0
        self._latencies: list = []

    def record_sent(self) -> None:
        self._sent_count += 1

    def record_received(self, latency: float) -> None:
        self._received_count += 1
        self._latencies.append(latency)

    def record_failure(self) -> None:
        self._failures += 1

    def record_dlq(self) -> None:
        self._dlq_count += 1

    def record_broadcast(self) -> None:
        self._broadcast_count += 1

    def get_metrics_report(self) -> dict:
        total = len(self._latencies)
        avg_latency = sum(self._latencies) / total if total > 0 else 0.0
        return {
            "messages_sent": self._sent_count,
            "messages_received": self._received_count,
            "failures": self._failures,
            "dead_letters_quarantined": self._dlq_count,
            "broadcast_count": self._broadcast_count,
            "average_transit_latency_seconds": round(avg_latency, 4)
        }


# Instantiate comm metrics singleton
comm_metrics = CommMetricsTracker()
