from app.providers.requests.response import ProviderResponse
from app.inference.exceptions import ValidationError
from loguru import logger

class ResponseValidator:
    """
    Validates LLM provider response structure, safety flags, and metadata.
    """
    def validate_response(self, response: ProviderResponse) -> None:
        """
        Runs validation checks. Raises ValidationError if validation fails.
        """
        logger.debug("ResponseValidator: Checking provider response parameters...")

        # 1. Structural check
        if not response.text and not response.tool_calls:
            raise ValidationError("Response is empty (neither text nor tool calls were returned).")

        # 2. Safety validation checks mock
        safety_ratings = response.metadata.get("safety_ratings", [])
        for rating in safety_ratings:
            if rating.get("blocked", False):
                raise ValidationError("Response blocked due to safety guidelines violations.")

        # 3. Usage validation checks
        if response.usage.total_tokens < 0:
            raise ValidationError("Invalid token usage counts reported.")

        logger.debug("ResponseValidator: Response passed validation check scopes successfully.")
