from fastapi import APIRouter
from app.api.v1.endpoints import (
    status,
    users,
    events,
    incidents,
    agent_logs,
    orchestrator,
    agents,
    providers,
    tools,
    inference,
    gemini,
    memory,
    communication,
)

api_router = APIRouter()

# Include version v1 route endpoints
api_router.include_router(status.router, prefix="", tags=["Status"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(events.router, prefix="/events", tags=["Events"])
api_router.include_router(incidents.router, prefix="/incidents", tags=["Incidents"])
api_router.include_router(agent_logs.router, prefix="/agent-logs", tags=["Agent Logs"])
api_router.include_router(orchestrator.router, prefix="/orchestrator", tags=["Orchestrator"])
api_router.include_router(agents.router, prefix="/agents", tags=["Agents"])
api_router.include_router(providers.router, prefix="/providers", tags=["Providers"])
api_router.include_router(tools.router, prefix="/tools", tags=["Tools"])
api_router.include_router(inference.router, prefix="/inference", tags=["Inference"])
api_router.include_router(gemini.router, prefix="/providers/gemini", tags=["Gemini"])
api_router.include_router(memory.router, prefix="/memory", tags=["Memory"])
api_router.include_router(communication.router, prefix="/communication", tags=["Communication"])
