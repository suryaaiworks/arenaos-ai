from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_async_db
from app.repositories.event import EventRepository
from app.schemas.event import EventListResponse, EventCreate, EventResponse
from app.models.enums import EventType
from loguru import logger

router = APIRouter()
event_repo = EventRepository()

@router.post("/", response_model=EventResponse)
async def create_event(
    event_in: EventCreate,
    db: AsyncSession = Depends(get_async_db)
):
    """
    Creates a new event telemetry record.
    """
    logger.info(f"API: Creating new event: {event_in.title}")
    return await event_repo.create(db, event_in)


@router.get("/", response_model=EventListResponse)
async def get_events(
    type: EventType | None = Query(None),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    db: AsyncSession = Depends(get_async_db)
):
    """
    Retrieves dynamic stadium flow telemetry events (supports pagination and type filter).
    """
    logger.info(f"API: Requesting events page {page} with type filter: {type}")
    
    # Calculate count and filter
    filters = {}
    if type is not None:
        filters["type"] = type
        
    total = await event_repo.count(db)
    items = await event_repo.filter(db, page=page, page_size=page_size, **filters)
    
    return {
        "items": items,
        "total": total,
        "page": page,
        "page_size": page_size
    }
