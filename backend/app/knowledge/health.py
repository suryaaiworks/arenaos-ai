import time
from app.knowledge.metrics import knowledge_metrics

class KnowledgeHealthChecker:
    """
    Exposes diagnostics checks report for the Knowledge Engine.
    """
    def __init__(self):
        self.uptime_start = time.time()

    def get_health_report(self) -> dict:
        uptime = time.time() - self.uptime_start
        k_dict = knowledge_metrics.get_metrics_report()
        
        return {
            "status": "healthy",
            "uptime_seconds": round(uptime, 2),
            "total_searches": k_dict["total_searches"],
            "total_evaluations": k_dict["total_evaluations"],
            "average_evaluation_latency": k_dict["average_evaluation_latency"]
        }
