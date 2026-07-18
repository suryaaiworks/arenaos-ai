import uuid
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field

class ProviderRequest(BaseModel):
    """
    Standard request payload schema passed down to the model provider layer.
    """
    request_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    workflow_id: Optional[uuid.UUID] = None
    agent_name: Optional[str] = None
    task_id: Optional[uuid.UUID] = None
    system_prompt: Optional[str] = None
    user_prompt: str = Field(..., description="Primary prompt text prompt input")
    context: Dict[str, Any] = Field(default_factory=dict)
    tools: List[Dict[str, Any]] = Field(default_factory=list)
    memory: List[Dict[str, Any]] = Field(default_factory=list)
    temperature: float = Field(default=0.7)
    max_tokens: int = Field(default=2048)
    top_p: float = Field(default=1.0)
    stream: bool = Field(default=False)
    metadata: Dict[str, Any] = Field(default_factory=dict)
