from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from app.agents.plugins.emergency.workflows import EmergencyWorkflowRunner
from app.agents.plugins.emergency.schemas import EmergencyRespondRequest, EmergencyIncidentReport
from app.agents.plugins.emergency.health import EmergencyHealthChecker
from loguru import logger

router = APIRouter()

class EmergencySimulateRequest(BaseModel):
    incident: str = Field(..., description="Raw text detailing emergency situation reports")


# Instantiate checker/runner
runner = EmergencyWorkflowRunner()
health_checker = EmergencyHealthChecker()

@router.post("/respond", response_model=EmergencyIncidentReport, status_code=status.HTTP_200_OK)
async def respond_emergency(req: EmergencyRespondRequest):
    """
    Direct endpoint running Emergency Agent AI coordination analysis and report workflow.
    """
    logger.info("API: Running emergency response analysis...")
    try:
        return await runner.execute_workflow(req)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/simulate", response_model=EmergencyIncidentReport, status_code=status.HTTP_200_OK)
async def simulate_emergency(req: EmergencySimulateRequest):
    """
    Simulates severe emergencies (fire, outage, stampede) coordinating multiple agents.
    """
    logger.info("API: Simulating emergency response scenario...")
    try:
        # Construct standard request
        analyze_req = EmergencyRespondRequest(
            incident=req.incident,
            context={"simulated": True, "event_time": "match_day"}
        )
        return await runner.execute_workflow(analyze_req)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get("/health", response_model=dict)
async def get_emergency_agent_health():
    """
    Returns diagnostic health and uptime summary parameters for Emergency Agent.
    """
    logger.info("API: Auditing Emergency Agent health status...")
    return health_checker.get_health_report()
