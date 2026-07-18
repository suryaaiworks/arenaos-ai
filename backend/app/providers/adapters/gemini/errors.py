from google.genai import errors
from app.providers.base.exceptions import (
    AuthenticationFailed,
    RateLimitExceeded,
    ProviderUnavailable,
    ProviderTimeout,
    InvalidProviderRequest,
    ProviderException,
)
from loguru import logger

class GeminiErrorTranslator:
    """
    Translates Google GenAI SDK errors into standard ProviderException subclasses.
    """
    def translate_exception(self, exc: Exception) -> ProviderException:
        logger.debug(f"GeminiErrors: Translating raw exception class '{exc.__class__.__name__}'...")
        
        if isinstance(exc, errors.APIError):
            # Check status codes or text matching
            message = str(exc)
            code = getattr(exc, "code", None)
            
            if code == 401 or "api key" in message.lower() or "unauthorized" in message.lower():
                return AuthenticationFailed(f"Gemini authentication failed: {message}")
            if code == 429 or "rate limit" in message.lower() or "quota" in message.lower():
                return RateLimitExceeded(f"Gemini quota/rate limit exceeded: {message}")
            if code == 400 or "invalid" in message.lower():
                return InvalidProviderRequest(f"Gemini invalid request: {message}")
            if code == 503 or "unavailable" in message.lower():
                return ProviderUnavailable(f"Gemini service unavailable: {message}")
            if code == 504 or "timeout" in message.lower():
                return ProviderTimeout(f"Gemini gateway timeout: {message}")
                
            return ProviderException(f"Gemini API error: {message}")
            
        # Treat unknown exceptions as generic provider failures
        return ProviderException(f"Gemini unexpected SDK error: {str(exc)}")
