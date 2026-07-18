from typing import Set
from app.orchestrator.exceptions import InvalidRequest
from loguru import logger

class RequestClassifier:
    """
    Classification component normalising and validating request categories.
    """
    def __init__(self):
        # Default registered categories
        self._categories: Set[str] = {
            "security",
            "crowd",
            "medical",
            "parking",
            "ticketing",
            "maintenance",
            "navigation",
            "emergency"
        }

    def classify_and_normalize(self, request_type: str) -> str:
        """
        Normalises request type string and verifies category registration.
        """
        logger.debug(f"Classification: Normalising request category string: '{request_type}'")
        normalized = request_type.strip().lower()
        
        if normalized not in self._categories:
            logger.error(f"Classification: Unsupported request category: '{request_type}'")
            raise InvalidRequest(
                f"Unsupported request category '{request_type}'. "
                f"Allowed categories: {sorted(list(self._categories))}"
            )
            
        return normalized

    def register_category(self, category: str) -> None:
        """
        Registers new category name dynamically.
        """
        normalized = category.strip().lower()
        if normalized:
            self._categories.add(normalized)
            logger.info(f"Classification: Registered new request category dynamically: '{normalized}'")
