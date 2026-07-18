from typing import Dict, List
from loguru import logger

class MetricsTracker:
    """
    In-memory metrics accumulator monitoring ArenaMind orchestrator actions latency
    and agent performance statistics.
    """
    def __init__(self):
        self._request_count: int = 0
        self._success_count: int = 0
        self._failure_count: int = 0
        self._execution_times: List[float] = []
        self._agent_usage: Dict[str, int] = {}

    def record_execution(self, agent_name: str, duration: float, success: bool) -> None:
        """
        Appends runtime metrics to memory.
        """
        self._request_count += 1
        self._execution_times.append(duration)
        self._agent_usage[agent_name] = self._agent_usage.get(agent_name, 0) + 1
        
        if success:
            self._success_count += 1
        else:
            self._failure_count += 1
            
        logger.debug(
            f"Metrics: Recorded execution for {agent_name} | "
            f"Duration: {duration:.4f}s | Success: {success}"
        )

    def get_metrics_report(self) -> dict:
        """
        Generates standard summary dictionary metrics report.
        """
        total_workflow = self._success_count + self._failure_count
        avg_latency = sum(self._execution_times) / len(self._execution_times) if self._execution_times else 0.0
        success_rate = (self._success_count / total_workflow) * 100 if total_workflow else 0.0
        failure_rate = (self._failure_count / total_workflow) * 100 if total_workflow else 0.0

        return {
            "request_count": self._request_count,
            "success_rate_percent": round(success_rate, 2),
            "failure_rate_percent": round(failure_rate, 2),
            "average_latency_seconds": round(avg_latency, 4),
            "agent_usage": self._agent_usage,
            "success_count": self._success_count,
            "failure_count": self._failure_count
        }


# Instantiate metrics singleton
metrics_tracker = MetricsTracker()
