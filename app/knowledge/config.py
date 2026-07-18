from pydantic import Field
from app.core.config import BaseSettings

class KnowledgeConfiguration(BaseSettings):
    """
    Configuration parameters controlling confidence overlap scoring.
    """
    min_confidence_score: float = Field(default=0.5)
    auto_refresh_policies_sec: int = Field(default=300)
