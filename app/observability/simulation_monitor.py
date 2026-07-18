from app.digital_twin.scenario_metrics import simulation_metrics

class SimulationMonitor:
    """
    Retrieves and aggregates real-time performance stats for the Digital Twin.
    """
    def get_simulation_metrics(self) -> dict:
        return simulation_metrics.get_metrics_report()
