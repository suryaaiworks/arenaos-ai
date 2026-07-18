from typing import Dict
from loguru import logger

class MemoryMetricsTracker:
    """
    Accumulates usage metrics, hit rates, sizes, and latency diagnostics.
    """
    def __init__(self):
        self._total_reads: int = 0
        self._total_writes: int = 0
        self._hits: int = 0
        self._misses: int = 0
        self._compression_events: int = 0
        self._active_sessions: int = 0
        self._retrieval_latencies: list = []

    def record_access(self, hit: bool, latency: float) -> None:
        self._total_reads += 1
        self._retrieval_latencies.append(latency)
        if hit:
            self._hits += 1
        else:
            self._misses += 1

    def record_write(self) -> None:
        self._total_writes += 1

    def record_compression(self) -> None:
        self._compression_events += 1

    def set_active_sessions(self, count: int) -> None:
        self._active_sessions = count

    def get_metrics_report(self) -> dict:
        total = len(self._retrieval_latencies)
        avg_latency = sum(self._retrieval_latencies) / total if total > 0 else 0.0
        hit_rate = self._hits / self._total_reads if self._total_reads > 0 else 0.0
        return {
            "total_reads": self._total_reads,
            "total_writes": self._total_writes,
            "hits": self._hits,
            "misses": self._misses,
            "hit_rate": round(hit_rate, 4),
            "compression_events": self._compression_events,
            "active_sessions_count": self._active_sessions,
            "average_retrieval_latency_seconds": round(avg_latency, 4)
        }


# Instantiate metrics singleton
memory_metrics = MemoryMetricsTracker()
