from app.observability.schemas import DashboardOverview, MetricsReport
from app.observability.collector import metrics_collector
from app.observability.dashboard import DashboardCompiler
from app.observability.health import ObservabilityHealthMonitor

class ObservabilityEngine:
    """
    Facade coordinating collector operations and dashboard aggregations.
    """
    def __init__(self):
        self.collector = metrics_collector
        self.compiler = DashboardCompiler()
        self.health_monitor = ObservabilityHealthMonitor()

    async def get_overview(self) -> DashboardOverview:
        return await self.compiler.compile_dashboard()

    def get_metrics(self) -> MetricsReport:
        return self.collector.collect_metrics_report()

    async def get_health_status(self) -> dict:
        score = await self.health_monitor.get_overall_health()
        checks = await self.health_monitor.check_subsystems()
        return {
            "overall_health_score": score,
            "subsystems": checks
        }


# Instantiate engine singleton
observability_engine = ObservabilityEngine()
