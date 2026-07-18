import time
from app.replay.metrics import replay_metrics

class ReplayHealthChecker:
    """
    Exposes diagnostics checks report for the Incident Replay Engine.
    """
    def __init__(self):
        self.uptime_start = time.time()

    def get_health_report(self) -> dict:
        uptime = time.time() - self.uptime_start
        r_dict = replay_metrics.get_metrics_report()
        
        return {
            "status": "healthy",
            "uptime_seconds": round(uptime, 2),
            "total_replays_played": r_dict["total_replays_played"],
            "average_replay_duration": r_dict["average_replay_duration_seconds"]
        }
