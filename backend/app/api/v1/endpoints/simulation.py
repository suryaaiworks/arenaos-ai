import uuid
from fastapi import APIRouter, HTTPException, status
from app.digital_twin.engine import digital_twin_engine
from app.digital_twin.scenario_registry import simulation_registry
from app.digital_twin.scenario_schemas import SimulationStartRequest, SimulationReport, SimulationRunRequest
from app.digital_twin.health import DigitalTwinHealthChecker
from loguru import logger

router = APIRouter()
health_checker = DigitalTwinHealthChecker()

@router.post("/start", response_model=SimulationReport, status_code=status.HTTP_201_CREATED)
async def start_simulation(req: SimulationStartRequest):
    """
    Initializes and starts a stadium operation simulation.
    """
    logger.info(f"API: Request to start simulation '{req.scenario_name}'...")
    try:
        return await digital_twin_engine.run_simulation(req)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/run", response_model=SimulationReport, status_code=status.HTTP_200_OK)
async def run_simulation_step(req: SimulationRunRequest):
    """
    Runs a progression time-step for an active simulation.
    """
    logger.info(f"API: Running simulation time-step for '{req.simulation_id}'...")
    sim = simulation_registry.get_simulation(req.simulation_id)
    if not sim:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Simulation with ID '{req.simulation_id}' not found."
        )
    return sim


@router.get("/health", response_model=dict, status_code=status.HTTP_200_OK)
async def get_simulation_health():
    """
    Returns diagnostic health and uptime summary parameters for the Digital Twin Engine.
    """
    logger.info("API: Auditing Digital Twin Engine health status...")
    return health_checker.get_health_report()


@router.get("/{simulation_id}", response_model=SimulationReport, status_code=status.HTTP_200_OK)
async def get_simulation(simulation_id: uuid.UUID):
    """
    Retrieves the status, timeline, and visualization maps of a simulation by ID.
    """
    logger.info(f"API: Querying simulation details for '{simulation_id}'...")
    sim = simulation_registry.get_simulation(simulation_id)
    if not sim:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Simulation with ID '{simulation_id}' not found."
        )
    return sim
