from app.providers.manager.registry import provider_registry
from loguru import logger

class ProviderMonitor:
    """
    Monitors status and performance metrics of model providers.
    """
    async def get_provider_metrics(self) -> dict:
        gemini_prov = provider_registry.get_provider("gemini")
        gemini_health = await gemini_prov.health() if gemini_prov else {"status": "offline"}
        
        mock_prov = provider_registry.get_provider("mock")
        mock_health = await mock_prov.health() if mock_prov else {"status": "offline"}
        
        return {
            "gemini": gemini_health,
            "mock": mock_health
        }
