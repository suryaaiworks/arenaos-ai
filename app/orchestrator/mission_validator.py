from app.orchestrator.mission_schemas import MissionStartRequest
from app.orchestrator.exceptions import InvalidRequest
from loguru import logger

class MissionValidator:
    """
    Validates starting mission payload parameter integrity.
    """
    def validate_request(self, req: MissionStartRequest) -> bool:
        logger.debug("MissionValidator: Verifying start request parameter schemas...")
        if not req.incident or len(req.incident.strip()) == 0:
            raise InvalidRequest("Incident description prompt details cannot be empty.")
        return True
