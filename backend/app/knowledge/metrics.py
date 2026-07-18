from typing import List
from loguru import logger

class KnowledgeMetricsTracker:
    """
    Accumulates telemetry details regarding playbook lookups.
    """
    def __init__(self):
        self._total_searches: int = 0
        self._total_evaluations: int = 0
        self._execution_times: List[float] = []

    def record_search(self) -> None:
        self._total_searches += 1

    def record_evaluation(self, duration: float) -> None:
        self._total_evaluations += 1
        self._execution_times.append(duration)
        logger.debug(f"KnowledgeMetrics: Logged rule evaluation in {duration:.6f}s")

    def get_metrics_report(self) -> dict:
        total = len(self._execution_times)
        avg = sum(self._execution_times) / total if total > 0 else 0.0
        return {
            "total_searches": self._total_searches,
            "total_evaluations": self._total_evaluations,
            "average_evaluation_latency": round(avg, 6)
        }


# Instantiate metrics singleton
knowledge_metrics = KnowledgeMetricsTracker()
