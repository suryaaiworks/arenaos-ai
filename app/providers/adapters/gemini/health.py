import time
from app.providers.adapters.gemini.client import GeminiClient
from loguru import logger

class GeminiHealthChecker:
    """
    Validates Google GenAI SDK initialisation settings and API connection health.
    """
    def __init__(self, client: GeminiClient):
        self.client = client

    async def verify_health(self) -> dict:
        logger.debug("GeminiHealth: Running connectivity audits checks...")
        start_time = time.time()
        
        initialized = self.client.has_credentials()
        model_name = self.client.config.model
        api_key_masked = "****" if initialized else "None"
        
        status = "healthy"
        error_msg = None
        
        if not initialized:
            status = "unconfigured"
            error_msg = "Google Gemini API key not found in environment."
        else:
            try:
                # Test connectivity using token count
                logger.debug("GeminiHealth: Querying count_tokens endpoint API key validation...")
                await self.client.raw_client.aio.models.count_tokens(
                    model=model_name,
                    contents="health_check"
                )
            except Exception as e:
                status = "unhealthy"
                error_msg = f"Connectivity check failed: {str(e)}"
                logger.error(f"GeminiHealth: Diagnostics failed: {error_msg}")

        return {
            "provider": "gemini",
            "status": status,
            "initialized": initialized,
            "api_key_configured": initialized,
            "configured_model": model_name,
            "api_key_masked": api_key_masked,
            "latency_seconds": round(time.time() - start_time, 4),
            "error_detail": error_msg
        }
