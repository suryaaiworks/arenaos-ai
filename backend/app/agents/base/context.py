import uuid
from typing import Any, Dict, Optional
from pydantic import BaseModel, Field
from app.agents.base.state import AgentState

class AgentContext(BaseModel):
    """
    State tracking block managing active environment state variables of the agent.
    """
    agent_id: uuid.UUID
    state: AgentState = AgentState.CREATED
    session_id: Optional[str] = None
    environment: str = Field(default="development")
    metadata: Dict[str, Any] = Field(default_factory=dict)
