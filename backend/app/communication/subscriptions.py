from typing import List
from pydantic import BaseModel, Field

class AgentSubscription(BaseModel):
    """
    Subscribes agent receiver target listeners to messages topics/events.
    """
    agent_id: str
    topics: List[str] = Field(default_factory=list)
    message_types: List[str] = Field(default_factory=list)
    capabilities: List[str] = Field(default_factory=list)
