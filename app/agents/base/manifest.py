import uuid
from typing import Any, Dict, List
from pydantic import BaseModel, Field
from app.agents.base.capabilities import AgentCapability

class AgentManifest(BaseModel):
    """
    Standard metadata descriptor model representing an agent's specs and interfaces.
    """
    agent_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    name: str
    version: str = Field(default="1.0.0")
    description: str
    category: str
    owner: str = Field(default="ArenaOS AI Core")
    supported_tasks: List[str] = Field(default_factory=list)
    supported_languages: List[str] = Field(default_factory=list)
    capabilities: List[AgentCapability] = Field(default_factory=list)
    required_tools: List[str] = Field(default_factory=list)
    required_memory: List[str] = Field(default_factory=list)
    supported_events: List[str] = Field(default_factory=list)
    supported_workflows: List[str] = Field(default_factory=list)
    health_endpoint: str = Field(default="/health")
    configuration_schema: Dict[str, Any] = Field(default_factory=dict)
