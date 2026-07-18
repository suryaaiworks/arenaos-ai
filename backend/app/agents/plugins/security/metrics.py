from typing import List
from loguru import logger

class SecurityMetricsTracker:
    """
    Accumulates request latency and success telemetry for SecurityAgent.
    """
    def __init__(self):
        self._total_processed: int = 0
        self._total_failures: int = 0
        self._latencies: List[float] = []

    def record_transaction(self, duration: float, success: bool) -> None:
        self._total_processed += 1
        if success:
            self._latencies.append(duration)
        else:
            self._total_failures += 1
        logger.debug(f"SecurityMetrics: Processed: {self._total_processed} | Latency: {duration:.4f}s | Success: {success}")

    def get_metrics_report(self) -> dict:
        total = len(self._latencies)
        avg = sum(self._latencies) / total if total > 0 else 0.0
        return {
            "requests_processed": self._total_processed,
            "requests_failed": self._total_failures,
            "average_latency_seconds": round(avg, 4),
            "total_latencies_logged": total
        }


# Instantiate metrics singleton
security_metrics = SecurityMetricsTracker()
