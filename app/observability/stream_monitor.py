from app.streaming.engine import event_streaming_engine
from app.streaming.metrics import streaming_metrics

class StreamMonitor:
    """
    Retrieves and aggregates real-time performance stats for the Event Streaming Engine.
    """
    def get_streaming_metrics(self) -> dict:
        conns = len(event_streaming_engine.connections.get_active_websockets())
        report = streaming_metrics.get_metrics_report()
        return {
            "active_websocket_connections": conns,
            "total_events_broadcasted": report["total_broadcasted"],
            "dropped_events": report["dropped_events"],
            "average_broadcast_latency": report["average_broadcast_latency_seconds"]
        }
