import uuid
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field, ConfigDict
from app.models.enums import EventType

class EventBase(BaseModel):
    title: str = Field(..., max_length=150)
    description: Optional[str] = Field(None, max_length=500)
    type: EventType
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class EventCreate(EventBase):
    pass


class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    type: Optional[EventType] = None
    timestamp: Optional[datetime] = None


class EventResponse(EventBase):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    is_deleted: bool


class EventListResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    items: List[EventResponse]
    total: int
    page: int
    page_size: int
