import time
from app.orchestrator.mission_metrics import mission_metrics

class MissionHealthChecker:
    """
    Exposes diagnostics checks report for the Mission Orchestrator subcomponent.
    """
    def __init__(self):
        self.uptime_start = time.time()

    def get_health_report(self) -> dict:
        uptime = time.time() - self.uptime_start
        m_dict = mission_metrics.get_metrics_report()
        
        return {
            "status": "healthy",
            "uptime_seconds": round(uptime, 2),
            "total_missions_started": m_dict["total_missions_started"],
            "average_mission_duration": m_dict["average_mission_duration_seconds"],
            "failed_missions": m_dict["missions_failed"]
        }
