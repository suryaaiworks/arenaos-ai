from typing import List
from app.observability.models import SystemAlert, AlertSeverity
from app.observability.metrics import global_metrics
from loguru import logger

class AlertGenerator:
    """
    Generates operational alarms based on collected performance metrics thresholds.
    """
    def __init__(self):
        self._alerts: List[SystemAlert] = []

    def evaluate_thresholds(self, metrics_report) -> List[SystemAlert]:
        alerts = []
        
        # Check latency warnings
        if metrics_report.average_response_time > 3.0:
            alerts.append(
                SystemAlert(
                    severity=AlertSeverity.WARNING,
                    subsystem="ArenaMind",
                    message=f"Platform average response time exceeds threshold: {metrics_report.average_response_time:.2f}s"
                )
            )
            
        # Check failure rates
        if metrics_report.failure_rate > 0.1:
            alerts.append(
                SystemAlert(
                    severity=AlertSeverity.ERROR,
                    subsystem="AgentFramework",
                    message=f"Agent workflow invocation failure rate is high: {metrics_report.failure_rate * 100:.1f}%"
                )
            )

        # Check errors
        if metrics_report.error_counts > 5:
            alerts.append(
                SystemAlert(
                    severity=AlertSeverity.CRITICAL,
                    subsystem="System",
                    message=f"Platform error count spike: {metrics_report.error_counts} logged errors"
                )
            )
            
        self._alerts = alerts
        return self._alerts

    def get_active_alerts(self) -> List[SystemAlert]:
        return self._alerts
