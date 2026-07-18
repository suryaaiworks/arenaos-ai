from typing import Dict, List
from app.providers.base.provider import BaseModelProvider
from app.providers.manager.registry import provider_registry
from app.providers.manager.selector import ProviderSelector
from app.providers.requests.request import ProviderRequest
from app.providers.requests.response import ProviderResponse
from loguru import logger

class ProviderManager:
    """
    Central provider manager coordinating registered model adapters, active states,
    switching contexts, and health metrics.
    """
    def __init__(self):
        self._registry = provider_registry
        self._selector = ProviderSelector(default_provider="mock")

    async def initialize_providers(self) -> None:
        """
        Runs init callbacks across registered adapters.
        """
        logger.info("ProviderManager: Initialising model provider adapters...")
        for name, provider in self._registry.list_providers().items():
            try:
                await provider.initialize()
            except Exception as e:
                logger.error(f"ProviderManager: Failed to initialize '{name}': {e}")

    def select_provider(self, name: str) -> None:
        """
        Updates the active selection parameter value.
        """
        # Validate existance in registry
        self._registry.get_provider(name)
        self._selector.select_active_provider(name)

    def get_active_provider(self) -> BaseModelProvider:
        active_name = self._selector.get_active_provider_name()
        return self._registry.get_provider(active_name)

    def get_active_provider_name(self) -> str:
        return self._selector.get_active_provider_name()

    async def generate_response(self, request: ProviderRequest) -> ProviderResponse:
        """
        Routes generation requests directly into the active selected adapter.
        """
        provider = self.get_active_provider()
        logger.info(f"ProviderManager: Routing generate prompt request to active provider '{self.get_active_provider_name()}'")
        
        # Validate request parameters before execution
        await provider.validate_request(request)
        
        response = await provider.generate(request)
        logger.info(f"ProviderManager: Response generated successfully in {response.latency:.4f}s")
        return response

    async def check_all_health(self) -> List[dict]:
        """
        Runs diagnostic status audits across registered providers.
        """
        report = []
        for name, provider in self._registry.list_providers().items():
            try:
                h = await provider.health()
                report.append({"name": name, "health": h})
            except Exception as e:
                report.append({"name": name, "health": {"status": "unhealthy", "error": str(e)}})
        return report


# Instantiate central ProviderManager singleton
provider_manager = ProviderManager()
