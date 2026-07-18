from typing import Any, Dict, Optional
from pydantic import BaseModel, Field

class ProviderConfiguration(BaseModel):
    """
    Standard settings structure mapping connection parameters to provider adapters.
    """
    api_key: Optional[str] = None
    api_base: Optional[str] = None
    timeout_seconds: float = Field(default=30.0)
    max_retries: int = Field(default=3)
    extra_params: Dict[str, Any] = Field(default_factory=dict)
