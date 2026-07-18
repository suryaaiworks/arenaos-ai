import uuid
from typing import Any, Dict, List
from pydantic import BaseModel, Field

class RuleEvaluationRequest(BaseModel):
    category: str = Field(..., description="E.g., emergency, security, crowd")
    context: Dict[str, Any] = Field(default_factory=dict)


class KnowledgeResponse(BaseModel):
    """
    Standardized response payload representing evaluated rules and recommendations.
    """
    knowledge_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    matched_policies: List[str] = Field(default_factory=list)
    matched_rules: List[str] = Field(default_factory=list)
    confidence: float = Field(default=1.0)
    recommendations: List[str] = Field(default_factory=list)
    decision_summary: str
    metadata: Dict[str, Any] = Field(default_factory=dict)
