from typing import Any, Dict
from pydantic import BaseModel, Field

class AgentConfiguration(BaseModel):
    """
    Standard configurations class managing execution parameters.
    """
    timeouts: float = Field(default=30.0)
    retry_policy: Dict[str, Any] = Field(default_factory=lambda: {"max_retries": 3, "backoff": "exponential"})
    max_parallel_tasks: int = Field(default=5)
    logging_level: str = Field(default="INFO")
    enabled: bool = Field(default=True)
    custom_settings: Dict[str, Any] = Field(default_factory=dict)
