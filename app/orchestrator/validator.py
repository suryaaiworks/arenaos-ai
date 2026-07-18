from typing import Any, Dict, List
from app.orchestrator.exceptions import InvalidRequest
from loguru import logger

class RequestValidator:
    """
    Validator component validating request payload structure and integrity.
    """
    def validate_request(self, payload: Dict[str, Any]) -> List[str]:
        """
        Validates the incoming orchestrator request payload parameters.
        Returns a list of structured error message strings. If empty, validation passed.
        """
        logger.debug("Validation Started: Checking request payload structural integrity...")
        errors = []

        # Validate core keys presence
        if "request_type" not in payload or not payload["request_type"]:
            errors.append("Field 'request_type' is required and cannot be empty.")
        elif not isinstance(payload["request_type"], str):
            errors.append("Field 'request_type' must be a string.")

        if "message" not in payload or not payload["message"]:
            errors.append("Field 'message' is required and cannot be empty.")
        elif not isinstance(payload["message"], str):
            errors.append("Field 'message' must be a string.")

        # Validate metadata type if present
        if "metadata" in payload:
            if not isinstance(payload["metadata"], dict):
                errors.append("Optional field 'metadata' must be a JSON dictionary object.")

        logger.debug(f"Validation Completed: Structural checks generated {len(errors)} errors.")
        return errors
