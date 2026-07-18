from app.digital_twin.scenario_schemas import SimulationStartRequest
from app.orchestrator.exceptions import InvalidRequest
from loguru import logger

class SimulationValidator:
    """
    Validates starting simulation payload parameters.
    """
    def validate_request(self, req: SimulationStartRequest) -> bool:
        logger.debug("SimulationValidator: Verifying start request parameters...")
        if not req.scenario_name or len(req.scenario_name.strip()) == 0:
            raise InvalidRequest("Scenario name details cannot be empty.")
        if not req.incident_prompt or len(req.incident_prompt.strip()) == 0:
            raise InvalidRequest("Incident prompt details cannot be empty.")
        return True
