from typing import List
from loguru import logger

class SimulationMetricsTracker:
    """
    Accumulates telemetry details regarding virtual simulation runs.
    """
    def __init__(self):
        self._total_simulations: int = 0
        self._execution_times: List[float] = []

    def record_simulation(self, duration: float) -> None:
        self._total_simulations += 1
        self._execution_times.append(duration)
        logger.debug(f"SimulationMetrics: Logged simulation run: {duration:.4f}s")

    def get_metrics_report(self) -> dict:
        total = len(self._execution_times)
        avg = sum(self._execution_times) / total if total > 0 else 0.0
        return {
            "total_simulations_run": self._total_simulations,
            "average_simulation_execution_seconds": round(avg, 4)
        }


# Instantiate metrics tracker singleton
simulation_metrics = SimulationMetricsTracker()
