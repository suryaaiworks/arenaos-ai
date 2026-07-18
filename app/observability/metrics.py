import time
from typing import List, Dict, Any
from app.observability.schemas import MetricsReport
from loguru import logger

class ObservabilityMetricsTracker:
    """
    In-memory storage for system performance metrics logs.
    """
    def __init__(self):
        self.agent_requests: int = 0
        self.mission_executions: int = 0
        self.simulation_executions: int = 0
        
        self.response_times: List[float] = []
        self.inference_latencies: List[float] = []
        self.gemini_latencies: List[float] = []
        self.tool_execution_times: List[float] = []
        self.memory_retrieval_times: List[float] = []
        self.streaming_latencies: List[float] = []
        self.communication_latencies: List[float] = []
        
        self.success_count: int = 0
        self.failure_count: int = 0
        self.error_counts: int = 0

    def get_report(self) -> MetricsReport:
        def avg(lst: List[float]) -> float:
            return sum(lst) / len(lst) if lst else 0.0
            
        total_runs = self.success_count + self.failure_count
        success_rate = self.success_count / total_runs if total_runs > 0 else 1.0
        failure_rate = self.failure_count / total_runs if total_runs > 0 else 0.0

        return MetricsReport(
            agent_requests=self.agent_requests,
            mission_executions=self.mission_executions,
            simulation_executions=self.simulation_executions,
            average_response_time=avg(self.response_times),
            inference_latency=avg(self.inference_latencies),
            gemini_latency=avg(self.gemini_latencies),
            tool_execution_time=avg(self.tool_execution_times),
            memory_retrieval_time=avg(self.memory_retrieval_times),
            streaming_latency=avg(self.streaming_latencies),
            communication_latency=avg(self.communication_latencies),
            success_rate=success_rate,
            failure_rate=failure_rate,
            error_counts=self.error_counts
        )


# Instantiate global metrics singleton
global_metrics = ObservabilityMetricsTracker()
