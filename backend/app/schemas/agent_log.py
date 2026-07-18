import uuid
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field, ConfigDict

class AgentLogBase(BaseModel):
    agent_name: str = Field(..., max_length=100)
    log_level: str = Field(default="INFO", max_length=20)
    message: str = Field(..., max_length=2000)
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class AgentLogCreate(AgentLogBase):
    pass


class AgentLogUpdate(BaseModel):
    agent_name: Optional[str] = None
    log_level: Optional[str] = None
    message: Optional[str] = None
    timestamp: Optional[datetime] = None


class AgentLogResponse(AgentLogBase):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    is_deleted: bool


class AgentLogListResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    items: List[AgentLogResponse]
    total: int
    page: int
    page_size: int
