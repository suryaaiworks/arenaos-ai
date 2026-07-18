from enum import Enum
from typing import List
from pydantic import BaseModel, Field

class ChannelName(str, Enum):
    SECURITY = "security"
    CROWD = "crowd"
    MEDICAL = "medical"
    PARKING = "parking"
    NAVIGATION = "navigation"
    MAINTENANCE = "maintenance"
    EMERGENCY = "emergency"
    SYSTEM = "system"


class CommunicationChannel(BaseModel):
    """
    Channel configuration properties.
    """
    name: ChannelName
    description: str
    active: bool = Field(default=True)
    authorized_groups: List[str] = Field(default_factory=list)
