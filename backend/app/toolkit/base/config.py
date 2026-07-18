from typing import Any, Dict
from pydantic import BaseModel, Field

class ToolConfiguration(BaseModel):
    """
    Standard configurations class managing tool runtime options.
    """
    enabled: bool = Field(default=True)
    timeout: float = Field(default=30.0)
    retry_policy: Dict[str, Any] = Field(default_factory=lambda: {"max_retries": 3, "backoff": "exponential"})
    cache_enabled: bool = Field(default=False)
    logging_level: str = Field(default="INFO")
    custom_settings: Dict[str, Any] = Field(default_factory=dict)
