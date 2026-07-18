from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field

class SafetyPolicy(BaseModel):
    block_harassment: bool = Field(default=True)
    block_hate_speech: bool = Field(default=True)
    block_dangerous_content: bool = Field(default=True)
    block_sexually_explicit: bool = Field(default=True)


class ModelPolicy(BaseModel):
    fallback_model: str = Field(default="mock-model")
    preferred_model: str = Field(default="mock-model")


class RetryPolicy(BaseModel):
    max_attempts: int = Field(default=3)
    backoff_factor: float = Field(default=2.0)
    retryable_exceptions: List[str] = Field(default_factory=lambda: ["ProviderTimeout", "RateLimitExceeded"])


class ToolPolicy(BaseModel):
    auto_inject_tools: bool = Field(default=True)
    max_tools_to_inject: int = Field(default=10)


class MemoryPolicy(BaseModel):
    include_short_term: bool = Field(default=True)
    include_long_term: bool = Field(default=False)
    max_history_turns: int = Field(default=5)


class InferencePolicies(BaseModel):
    """
    Configurable settings controlling prompts and executions of the inference pipeline.
    """
    safety: SafetyPolicy = Field(default_factory=SafetyPolicy)
    model: ModelPolicy = Field(default_factory=ModelPolicy)
    retry: RetryPolicy = Field(default_factory=RetryPolicy)
    tool: ToolPolicy = Field(default_factory=ToolPolicy)
    memory: MemoryPolicy = Field(default_factory=MemoryPolicy)
