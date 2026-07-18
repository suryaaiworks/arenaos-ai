from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_async_db
from app.repositories.incident import IncidentRepository
from app.schemas.incident import IncidentListResponse, IncidentCreate, IncidentResponse
from app.models.enums import IncidentStatus, Priority
from loguru import logger

router = APIRouter()
incident_repo = IncidentRepository()

@router.post("/", response_model=IncidentResponse)
async def create_incident(
    incident_in: IncidentCreate,
    db: AsyncSession = Depends(get_async_db)
):
    """
    Creates a new incident record.
    """
    logger.info(f"API: Creating new incident: {incident_in.title}")
    return await incident_repo.create(db, incident_in)


@router.get("/", response_model=IncidentListResponse)
async def get_incidents(
    status: IncidentStatus | None = Query(None),
    priority: Priority | None = Query(None),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    db: AsyncSession = Depends(get_async_db)
):
    """
    Retrieves a paginated list of active stadium incidents (supports status & priority filters).
    """
    logger.info(f"API: Requesting incidents (status: {status}, priority: {priority}) page {page}")
    
    filters = {}
    if status is not None:
        filters["status"] = status
    if priority is not None:
        filters["priority"] = priority
        
    total = await incident_repo.count(db)
    items = await incident_repo.filter(db, page=page, page_size=page_size, **filters)
    
    return {
        "items": items,
        "total": total,
        "page": page,
        "page_size": page_size
    }
