from app.repositories.base import BaseRepository
from app.models.event import Event
from app.schemas.event import EventCreate, EventUpdate

class EventRepository(BaseRepository[Event, EventCreate, EventUpdate]):
    """
    Concrete Repository mapping actions to Event model.
    """
    def __init__(self):
        super().__init__(Event)
