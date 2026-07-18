from app.repositories.base import BaseRepository
from app.models.agent_log import AgentLog
from app.schemas.agent_log import AgentLogCreate, AgentLogUpdate

class AgentLogRepository(BaseRepository[AgentLog, AgentLogCreate, AgentLogUpdate]):
    """
    Concrete Repository mapping actions to AgentLog model.
    """
    def __init__(self):
        super().__init__(AgentLog)
