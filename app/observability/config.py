from pydantic import Field
from app.core.config import BaseSettings

class ObservabilityConfiguration(BaseSettings):
    """
    Configuration parameters controlling observability collection intervals and alarms.
    """
    metrics_retention_limit: int = Field(default=1000)
    latency_warning_threshold_sec: float = Field(default=3.0)
    cpu_usage_mock_pct: float = Field(default=10.0)
