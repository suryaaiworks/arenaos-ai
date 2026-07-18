from app.orchestrator.mission_metrics import mission_metrics

class MissionMonitor:
    """
    Retrieves and aggregates real-time performance stats for the Mission Orchestrator.
    """
    def get_mission_metrics(self) -> dict:
        return mission_metrics.get_metrics_report()
