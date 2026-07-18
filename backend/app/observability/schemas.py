from datetime import datetime
from typing import Any, Dict, List
from pydantic import BaseModel, Field
from app.observability.models import SystemAlert

class MetricsReport(BaseModel):
    agent_requests: int = Field(default=0)
    mission_executions: int = Field(default=0)
    simulation_executions: int = Field(default=0)
    average_response_time: float = Field(default=0.0)
    inference_latency: float = Field(default=0.0)
    gemini_latency: float = Field(default=0.0)
    tool_execution_time: float = Field(default=0.0)
    memory_retrieval_time: float = Field(default=0.0)
    streaming_latency: float = Field(default=0.0)
    communication_latency: float = Field(default=0.0)
    success_rate: float = Field(default=1.0)
    failure_rate: float = Field(default=0.0)
    error_counts: int = Field(default=0)


class DashboardOverview(BaseModel):
    system_status: str = Field(default="OPERATIONAL")
    overall_health: float = Field(default=1.0)
    active_agents: int = Field(default=0)
    active_missions: int = Field(default=0)
    active_simulations: int = Field(default=0)
    connected_clients: int = Field(default=0)
    average_latency: float = Field(default=0.0)
    throughput: float = Field(default=0.0, description="Requests per minute (RPM)")
    alerts: List[SystemAlert] = Field(default_factory=list)
    metrics: MetricsReport = Field(default_factory=MetricsReport)
    cpu_usage_percentage: float = Field(default=5.0)
    memory_usage_percentage: float = Field(default=15.0)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
