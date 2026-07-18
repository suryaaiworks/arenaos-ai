import time
from datetime import datetime
from app.observability.schemas import DashboardOverview
from app.observability.collector import metrics_collector
from app.observability.health import ObservabilityHealthMonitor
from app.orchestrator.registry import agent_registry
from app.orchestrator.mission_registry import mission_registry
from app.digital_twin.scenario_registry import simulation_registry
from app.streaming.engine import event_streaming_engine
from loguru import logger

class DashboardCompiler:
    """
    Compiles full dashboard payload representing platform state summaries.
    """
    def __init__(self):
        self.health_monitor = ObservabilityHealthMonitor()

    async def compile_dashboard(self) -> DashboardOverview:
        logger.debug("DashboardCompiler: Packaging metrics overview...")
        
        # 1. Pull system wellness
        h_score = await self.health_monitor.get_overall_health()
        status = "OPERATIONAL"
        if h_score < 0.6:
            status = "CRITICAL"
        elif h_score < 0.9:
            status = "DEGRADED"
            
        # 2. Gather active registration counts
        agents = len(agent_registry._registry)
        missions = len(mission_registry.list_missions())
        simulations = len(simulation_registry.list_simulations())
        clients = len(event_streaming_engine.connections.get_active_websockets())
        
        # 3. Pull collected metrics
        metrics_rep = metrics_collector.collect_metrics_report()
        rpm = metrics_collector.analytics.get_requests_per_minute()
        active_alerts = metrics_collector.alerts.get_active_alerts()

        return DashboardOverview(
            system_status=status,
            overall_health=h_score,
            active_agents=agents,
            active_missions=missions,
            active_simulations=simulations,
            connected_clients=clients,
            average_latency=metrics_rep.average_response_time,
            throughput=rpm,
            alerts=active_alerts,
            metrics=metrics_rep,
            cpu_usage_percentage=12.5,
            memory_usage_percentage=35.0,
            timestamp=datetime.utcnow()
        )
