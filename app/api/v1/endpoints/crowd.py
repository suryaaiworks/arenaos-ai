from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from app.agents.plugins.crowd.workflows import CrowdWorkflowRunner
from app.agents.plugins.crowd.schemas import CrowdAnalyzeRequest, CrowdIncidentReport
from app.agents.plugins.crowd.health import CrowdHealthChecker
from loguru import logger

router = APIRouter()

class CrowdSimulateRequest(BaseModel):
    incident: str = Field(..., description="Raw text describing the stadium crowd buildup or evacuation scenario")


# Instantiate checker/runner
runner = CrowdWorkflowRunner()
health_checker = CrowdHealthChecker()

@router.post("/analyze", response_model=CrowdIncidentReport, status_code=status.HTTP_200_OK)
async def analyze_crowd_density(req: CrowdAnalyzeRequest):
    """
    Direct endpoint running Crowd Agent AI analysis and prediction report workflow.
    """
    logger.info("API: Running crowd traffic density analysis...")
    try:
        return await runner.execute_workflow(req)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/simulate", response_model=CrowdIncidentReport, status_code=status.HTTP_200_OK)
async def simulate_crowd_density(req: CrowdSimulateRequest):
    """
    Simulates match-day crowd traffic running end-to-end through the agent framework.
    """
    logger.info("API: Simulating match-day crowd traffic scenario...")
    try:
        # Construct standard request
        analyze_req = CrowdAnalyzeRequest(
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
async def get_crowd_agent_health():
    """
    Returns diagnostic health and uptime summary parameters for Crowd Agent.
    """
    logger.info("API: Auditing Crowd Agent health status...")
    return health_checker.get_health_report()
