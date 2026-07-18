from pydantic import BaseModel, Field

class TokenUsage(BaseModel):
    """
    Standard schema for monitoring model provider execution costs and latencies.
    """
    input_tokens: int = Field(default=0)
    output_tokens: int = Field(default=0)
    total_tokens: int = Field(default=0)
    estimated_cost: float = Field(default=0.0, description="Cost calculation in USD")
    latency_seconds: float = Field(default=0.0, description="Response generation duration")
    provider_name: str
    model_name: str
