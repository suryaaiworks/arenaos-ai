from typing import Dict, List
from loguru import logger

class InferenceMetricsTracker:
    """
    In-memory metrics accumulator for Inference Engine runs.
    """
    def __init__(self):
        self._total_requests: int = 0
        self._total_failures: int = 0
        self._total_retries: int = 0
        self._execution_times: List[float] = []
        self._provider_usage: Dict[str, int] = {}
        self._model_usage: Dict[str, int] = {}
        self._tool_invocations: Dict[str, int] = {}

    def record_run(
        self,
        provider: str,
        model: str,
        duration: float,
        success: bool,
        retries: int,
        tools_called: List[str]
    ) -> None:
        self._total_requests += 1
        self._execution_times.append(duration)
        self._total_retries += retries
        
        self._provider_usage[provider] = self._provider_usage.get(provider, 0) + 1
        self._model_usage[model] = self._model_usage.get(model, 0) + 1
        
        if not success:
            self._total_failures += 1
            
        for t in tools_called:
            self._tool_invocations[t] = self._tool_invocations.get(t, 0) + 1
            
        logger.debug(
            f"InferenceMetrics: Run logged | Provider: {provider} | "
            f"Model: {model} | Success: {success} | Latency: {duration:.4f}s"
        )

    def get_metrics_report(self) -> dict:
        total = len(self._execution_times)
        avg_latency = sum(self._execution_times) / total if total > 0 else 0.0
        return {
            "total_requests": self._total_requests,
            "total_failures": self._total_failures,
            "total_retries": self._total_retries,
            "average_latency_seconds": round(avg_latency, 4),
            "provider_usage": self._provider_usage,
            "model_usage": self._model_usage,
            "tool_invocations": self._tool_invocations
        }


# Instantiate metrics singleton
inference_metrics = InferenceMetricsTracker()
