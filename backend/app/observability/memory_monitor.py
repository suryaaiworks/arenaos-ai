from app.memory.engine import memory_engine

class MemoryMonitor:
    """
    Monitors status and performance metrics of the Memory Engine.
    """
    def get_memory_metrics(self) -> dict:
        # Check active session counts and metrics
        sessions_count = len(memory_engine._sessions) if hasattr(memory_engine, "_sessions") else 0
        return {
            "active_sessions_in_memory": sessions_count,
            "storage_adapter": "InMemoryStorage",
            "metrics": memory_engine.metrics.get_metrics_report() if hasattr(memory_engine, "metrics") else {}
        }
