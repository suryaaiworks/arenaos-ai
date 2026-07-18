import time
from app.digital_twin.scenario_metrics import simulation_metrics

class DigitalTwinHealthChecker:
    """
    Exposes diagnostics checks reports for the Digital Twin Engine.
    """
    def __init__(self):
        self.uptime_start = time.time()

    def get_health_report(self) -> dict:
        uptime = time.time() - self.uptime_start
        s_dict = simulation_metrics.get_metrics_report()
        
        return {
            "status": "healthy",
            "uptime_seconds": round(uptime, 2),
            "total_simulations_run": s_dict["total_simulations_run"],
            "average_simulation_execution_seconds": s_dict["average_simulation_execution_seconds"]
        }
