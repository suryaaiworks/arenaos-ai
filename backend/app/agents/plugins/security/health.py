import time
from app.agents.plugins.security.metrics import security_metrics
from loguru import logger

class SecurityHealthChecker:
    """
    Exposes diagnostics checks report matching Agent framework specifications.
    """
    def __init__(self):
        self.uptime_start = time.time()

    def get_health_report(self) -> dict:
        uptime = time.time() - self.uptime_start
        metrics_dict = security_metrics.get_metrics_report()
        
        return {
            "status": "healthy",
            "uptime_seconds": round(uptime, 2),
            "requests_processed": metrics_dict["requests_processed"],
            "average_latency": metrics_dict["average_latency_seconds"],
            "failures": metrics_dict["requests_failed"]
        }
