from app.observability.metrics import global_metrics
from app.observability.agent_monitor import AgentMonitor
from app.observability.mission_monitor import MissionMonitor
from app.observability.simulation_monitor import SimulationMonitor
from app.observability.stream_monitor import StreamMonitor
from app.observability.provider_monitor import ProviderMonitor
from app.observability.memory_monitor import MemoryMonitor
from app.observability.tool_monitor import ToolMonitor
from app.observability.analytics import ObservabilityAnalytics
from app.observability.alerts import AlertGenerator
from app.observability.schemas import MetricsReport
from loguru import logger

class MetricsCollector:
    """
    Coordinates collections loops across all monitors.
    """
    def __init__(self):
        self.agent = AgentMonitor()
        self.mission = MissionMonitor()
        self.simulation = SimulationMonitor()
        self.stream = StreamMonitor()
        self.provider = ProviderMonitor()
        self.memory = MemoryMonitor()
        self.tool = ToolMonitor()
        self.analytics = ObservabilityAnalytics()
        self.alerts = AlertGenerator()

    def record_transaction(self, response_time: float, success: bool) -> None:
        global_metrics.agent_requests += 1
        global_metrics.response_times.append(response_time)
        if len(global_metrics.response_times) > 1000:
            global_metrics.response_times.pop(0)
            
        if success:
            global_metrics.success_count += 1
        else:
            global_metrics.failure_count += 1
            
        self.analytics.record_request()
        logger.debug(f"MetricsCollector: Logged request execution. Success: {success} | Response time: {response_time:.4f}s")

    def collect_metrics_report(self) -> MetricsReport:
        logger.debug("MetricsCollector: Compiling aggregated performance metrics...")
        
        # Pull counts from active registries
        mission_rep = self.mission.get_mission_metrics()
        global_metrics.mission_executions = mission_rep.get("total_missions_started", 0)
        
        sim_rep = self.simulation.get_simulation_metrics()
        global_metrics.simulation_executions = sim_rep.get("total_simulations_run", 0)

        # Map details to MetricsReport
        rep = global_metrics.get_report()
        
        # Evaluate alarms
        self.alerts.evaluate_thresholds(rep)
        
        return rep


# Instantiate global collector singleton
metrics_collector = MetricsCollector()
