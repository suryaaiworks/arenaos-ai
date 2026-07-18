import time
from app.streaming.metrics import streaming_metrics

class StreamingEngineHealth:
    """
    Exposes diagnostics checks report for the Event Streaming Engine.
    """
    def __init__(self):
        self.uptime_start = time.time()

    def get_health_report(self) -> dict:
        uptime = time.time() - self.uptime_start
        s_dict = streaming_metrics.get_metrics_report()
        
        return {
            "status": "healthy",
            "uptime_seconds": round(uptime, 2),
            "total_broadcasted": s_dict["total_broadcasted"],
            "dropped_events": s_dict["dropped_events"],
            "average_broadcast_latency": s_dict["average_broadcast_latency_seconds"]
        }
