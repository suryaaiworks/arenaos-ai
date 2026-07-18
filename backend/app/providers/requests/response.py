import uuid
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field
from app.providers.requests.usage import TokenUsage

class ProviderResponse(BaseModel):
    """
    Standardized payload result schema returned by every model provider execution.
    """
    response_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    provider: str
    model: str
    text: str = Field(..., description="Generated text output content")
    tool_calls: List[Dict[str, Any]] = Field(default_factory=list)
    usage: TokenUsage
    latency: float = Field(..., description="Latency duration in seconds")
    finish_reason: str = Field(default="stop")
    metadata: Dict[str, Any] = Field(default_factory=dict)
