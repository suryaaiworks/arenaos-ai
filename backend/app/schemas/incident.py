import uuid
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field, ConfigDict
from app.models.enums import IncidentStatus, Priority

class IncidentBase(BaseModel):
    title: str = Field(..., max_length=150)
    description: Optional[str] = Field(None, max_length=1000)
    status: IncidentStatus = IncidentStatus.ACTIVE
    priority: Priority = Priority.MEDIUM
    location: Optional[str] = Field(None, max_length=250)


class IncidentCreate(IncidentBase):
    pass


class IncidentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[IncidentStatus] = None
    priority: Optional[Priority] = None
    location: Optional[str] = None


class IncidentResponse(IncidentBase):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    is_deleted: bool


class IncidentListResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    items: List[IncidentResponse]
    total: int
    page: int
    page_size: int
