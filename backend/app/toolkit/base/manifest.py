import uuid
from typing import Any, Dict, List
from pydantic import BaseModel, Field

class ToolManifest(BaseModel):
    """
    Standard descriptor model detailing specs and parameters metadata of a tool.
    """
    tool_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    name: str
    version: str = Field(default="1.0.0")
    description: str
    category: str
    author: str = Field(default="ArenaOS AI Toolkit Core")
    supported_operations: List[str] = Field(default_factory=list)
    input_schema: Dict[str, Any] = Field(default_factory=dict)
    output_schema: Dict[str, Any] = Field(default_factory=dict)
    permissions: List[str] = Field(default_factory=list)
    timeout: float = Field(default=30.0)
    tags: List[str] = Field(default_factory=list)
    dependencies: List[str] = Field(default_factory=list)
    health_endpoint: str = Field(default="/health")
