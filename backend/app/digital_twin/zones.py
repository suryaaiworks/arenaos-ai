from enum import Enum
from pydantic import BaseModel, Field

class ZoneStatus(str, Enum):
    NORMAL = "NORMAL"
    CONGESTED = "CONGESTED"
    CRITICAL = "CRITICAL"
    CLOSED = "CLOSED"


class StadiumZone(BaseModel):
    location_id: str
    name: str
    capacity: int = Field(default=1000)
    occupancy: int = Field(default=0)
    risk_score: float = Field(default=0.0)
    status: ZoneStatus = Field(default=ZoneStatus.NORMAL)
