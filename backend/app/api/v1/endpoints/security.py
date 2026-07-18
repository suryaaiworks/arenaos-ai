from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from app.agents.plugins.security.workflows import SecurityWorkflowRunner
from app.agents.plugins.security.schemas import SecurityAnalyzeRequest, SecurityIncidentReport
from app.agents.plugins.security.health import SecurityHealthChecker
from loguru import logger

router = APIRouter()

class SecuritySimulateRequest(BaseModel):
    incident: str = Field(..., description="Details of raw stadium surveillance incident report text")


# Instantiate checker/runner
runner = SecurityWorkflowRunner()
health_checker = SecurityHealthChecker()

@router.post("/analyze", response_model=SecurityIncidentReport, status_code=status.HTTP_200_OK)
async def analyze_security_incident(req: SecurityAnalyzeRequest):
    """
    Direct endpoint running Security Agent AI analysis and report generation workflow.
    """
    logger.info("API: Running security incident analysis...")
    try:
        return await runner.execute_workflow(req)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/simulate", response_model=SecurityIncidentReport, status_code=status.HTTP_200_OK)
async def simulate_security_incident(req: SecuritySimulateRequest):
    """
    Simulates match-day security events running them end-to-end through the agent framework.
    """
    logger.info("API: Simulating match-day security surveillance scenario...")
    try:
        # Construct standard request
        analyze_req = SecurityAnalyzeRequest(
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
async def get_security_agent_health():
    """
    Returns diagnostic health and uptime summary parameters for Security Agent.
    """
    logger.info("API: Auditing Security Agent health status...")
    return health_checker.get_health_report()
