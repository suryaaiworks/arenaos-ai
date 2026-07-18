from pydantic import BaseModel, Field

class ExpirationPolicy(BaseModel):
    enabled: bool = Field(default=True)
    ttl_seconds: float = Field(default=86400.0)  # 24 hours


class CompressionPolicy(BaseModel):
    enabled: bool = Field(default=True)
    compression_threshold_turns: int = Field(default=10)


class MemoryPolicies(BaseModel):
    """
    Configurable rules managing expiration, compression, and retention across registers.
    """
    expiration: ExpirationPolicy = Field(default_factory=ExpirationPolicy)
    compression: CompressionPolicy = Field(default_factory=CompressionPolicy)
    max_history_turns: int = Field(default=20)
