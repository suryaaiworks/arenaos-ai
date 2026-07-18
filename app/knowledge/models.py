import uuid
from typing import Any, Dict, List
from pydantic import BaseModel, Field

class OperationalRule(BaseModel):
    rule_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    category: str = Field(..., description="E.g., emergency, security, crowd")
    title: str
    condition: str
    action_playbook: str
    version: str = Field(default="1.0.0")
    metadata: Dict[str, Any] = Field(default_factory=dict)


class OperationalPolicy(BaseModel):
    policy_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    scope: str = Field(..., description="E.g., evacuation, medical, fire")
    title: str
    rules: List[str] = Field(default_factory=list)
    approved_by: str = Field(default="Stadium Operations Center")
    metadata: Dict[str, Any] = Field(default_factory=dict)
