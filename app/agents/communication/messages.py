import uuid
from datetime import datetime, timezone
from enum import Enum
from typing import Any, Dict, Optional
from pydantic import BaseModel, Field

class MessageType(str, Enum):
    DIRECT = "direct"
    BROADCAST = "broadcast"
    REQUEST = "request"
    RESPONSE = "response"


class MessageHeaders(BaseModel):
    correlation_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    trace_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    reply_to: Optional[str] = None
    sender: str
    recipient: Optional[str] = None


class Message(BaseModel):
    """
    Standard message model for agent-to-agent or agent-to-bus communications.
    """
    message_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    message_type: MessageType = MessageType.DIRECT
    headers: MessageHeaders
    payload: Dict[str, Any] = Field(default_factory=dict)
