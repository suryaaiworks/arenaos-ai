from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_async_db
from app.repositories.agent_log import AgentLogRepository
from app.schemas.agent_log import AgentLogListResponse, AgentLogCreate, AgentLogResponse
from loguru import logger

router = APIRouter()
agent_log_repo = AgentLogRepository()

@router.post("/", response_model=AgentLogResponse)
async def create_agent_log(
    log_in: AgentLogCreate,
    db: AsyncSession = Depends(get_async_db)
):
    """
    Creates a new agent log log trace.
    """
    logger.info(f"API: Creating agent log entry for {log_in.agent_name}")
    return await agent_log_repo.create(db, log_in)


@router.get("/", response_model=AgentLogListResponse)
async def get_agent_logs(
    agent_name: str | None = Query(None),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    db: AsyncSession = Depends(get_async_db)
):
    """
    Retrieves execution logs of autonomous ArenaMind subagents.
    """
    logger.info(f"API: Requesting agent logs (agent_name: {agent_name}) page {page}")
    
    filters = {}
    if agent_name is not None:
        filters["agent_name"] = agent_name
        
    total = await agent_log_repo.count(db)
    items = await agent_log_repo.filter(db, page=page, page_size=page_size, **filters)
    
    return {
        "items": items,
        "total": total,
        "page": page,
        "page_size": page_size
    }
