import uuid
from typing import Dict, Optional
from app.digital_twin.scenario_schemas import SimulationReport
from loguru import logger

class SimulationRegistry:
    """
    Registry database tracking active simulations contexts in memory.
    """
    def __init__(self):
        self._simulations: Dict[uuid.UUID, SimulationReport] = {}

    def register_simulation(self, sim: SimulationReport) -> None:
        self._simulations[sim.simulation_id] = sim
        logger.debug(f"SimulationRegistry: Registered simulation '{sim.simulation_id}' - '{sim.scenario_name}'")

    def get_simulation(self, sim_id: uuid.UUID) -> Optional[SimulationReport]:
        return self._simulations.get(sim_id)

    def list_simulations(self) -> Dict[uuid.UUID, SimulationReport]:
        return self._simulations


# Instantiate registry singleton
simulation_registry = SimulationRegistry()
