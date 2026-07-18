from pydantic import Field
from app.core.config import BaseSettings

class ReplayConfiguration(BaseSettings):
    """
    Configuration parameters controlling event player tick durations.
    """
    default_tick_ms: int = Field(default=500)
    max_replay_history_limit: int = Field(default=50)
