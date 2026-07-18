import uuid
from datetime import datetime
from enum import Enum
from typing import Any, Dict, Optional
from pydantic import BaseModel, Field

class MessageType(str, Enum):
    REQUEST = "REQUEST"
    RESPONSE = "RESPONSE"
    EVENT = "EVENT"
    COMMAND = "COMMAND"
    NOTIFICATION = "NOTIFICATION"
    HEARTBEAT = "HEARTBEAT"
    ERROR = "ERROR"
    BROADCAST = "BROADCAST"


class MessagePriority(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class AgentMessage(BaseModel):
    """
    Standard Message model representing inter-agent communication packets.
    """
    message_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    trace_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    correlation_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    workflow_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    request_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    sender: str = Field(..., description="Sender agent class or system node identifier")
    receiver: str = Field(..., description="Receiver agent class, system node, channel, or broadcast topic")
    message_type: MessageType = Field(default=MessageType.EVENT)
    priority: MessagePriority = Field(default=MessagePriority.MEDIUM)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    payload: Dict[str, Any] = Field(default_factory=dict)
    metadata: Dict[str, Any] = Field(default_factory=dict)
    ttl: float = Field(default=60.0, description="Time to live in seconds")
    status: str = Field(default="queued")
