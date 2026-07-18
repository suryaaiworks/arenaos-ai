import uuid
from datetime import datetime
from typing import List
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from app.models.enums import UserRole

class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    role: UserRole = UserRole.SPECTATOR


class UserCreate(UserBase):
    pass


class UserUpdate(BaseModel):
    email: EmailStr | None = None
    role: UserRole | None = None
    is_active: bool | None = None


class UserResponse(UserBase):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    is_active: bool
    created_at: datetime
    updated_at: datetime
    is_deleted: bool


class UserListResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    items: List[UserResponse]
    total: int
    page: int
    page_size: int
