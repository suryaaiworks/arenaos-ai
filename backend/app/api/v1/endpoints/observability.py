from fastapi import APIRouter, status
from app.observability.engine import observability_engine
from app.observability.schemas import DashboardOverview, MetricsReport
from loguru import logger

router = APIRouter()

@router.get("/overview", response_model=DashboardOverview, status_code=status.HTTP_200_OK)
async def get_dashboard_overview():
    """
    Returns structured dashboard overview report details.
    """
    logger.info("API: Generating observability overview report...")
    return await observability_engine.get_overview()


@router.get("/metrics", response_model=MetricsReport, status_code=status.HTTP_200_OK)
async def get_raw_metrics():
    """
    Returns platform execution metrics details.
    """
    logger.info("API: Retrieving raw platform performance metrics...")
    return observability_engine.get_metrics()


@router.get("/health", response_model=dict, status_code=status.HTTP_200_OK)
async def get_system_health():
    """
    Returns system health status for 12 core subcomponents.
    """
    logger.info("API: Bundling subsystem diagnostics health checks...")
    return await observability_engine.get_health_status()


@router.get("/agents", response_model=dict, status_code=status.HTTP_200_OK)
async def get_agents_telemetry():
    """
    Returns performance metrics specific to registered AI agents.
    """
    logger.info("API: Loading agents metric reports...")
    return observability_engine.collector.agent.get_agent_metrics()


@router.get("/missions", response_model=dict, status_code=status.HTTP_200_OK)
async def get_missions_telemetry():
    """
    Returns performance metrics specific to cooperative missions orchestrators.
    """
    logger.info("API: Loading missions metric reports...")
    return observability_engine.collector.mission.get_mission_metrics()


@router.get("/streaming", response_model=dict, status_code=status.HTTP_200_OK)
async def get_streaming_telemetry():
    """
    Returns connection and throughput telemetries specific to event streamings.
    """
    logger.info("API: Loading streaming metrics reports...")
    return observability_engine.collector.stream.get_streaming_metrics()


@router.get("/simulations", response_model=dict, status_code=status.HTTP_200_OK)
async def get_simulations_telemetry():
    """
    Returns performance metrics specific to digital twin simulations.
    """
    logger.info("API: Loading simulations metrics reports...")
    return observability_engine.collector.simulation.get_simulation_metrics()
