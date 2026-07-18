from app.repositories.base import BaseRepository
from app.models.incident import Incident
from app.schemas.incident import IncidentCreate, IncidentUpdate

class IncidentRepository(BaseRepository[Incident, IncidentCreate, IncidentUpdate]):
    """
    Concrete Repository mapping actions to Incident model.
    """
    def __init__(self):
        super().__init__(Incident)
