from typing import Dict
from app.providers.base.provider import BaseModelProvider
from app.providers.adapters.mock.adapter import MockProvider
from app.providers.adapters.gemini.adapter import GeminiProviderAdapter
from app.providers.base.config import ProviderConfiguration
from app.providers.adapters.gemini.config import GeminiProviderConfiguration
from loguru import logger

class ProviderRegistry:
    """
    Registry for managing available AI Model Providers.
    """
    def __init__(self):
        self._providers: Dict[str, BaseModelProvider] = {}

    def register(self, name: str, provider: BaseModelProvider) -> None:
        key = name.strip().lower()
        self._providers[key] = provider
        logger.info(f"ProviderRegistry: Registered provider '{name}' successfully.")

    def unregister(self, name: str) -> None:
        key = name.strip().lower()
        if key in self._providers:
            del self._providers[key]
            logger.info(f"ProviderRegistry: Unregistered provider '{name}'")

    def get_provider(self, name: str) -> BaseModelProvider:
        key = name.strip().lower()
        if key not in self._providers:
            raise KeyError(f"Provider '{name}' not found in registry.")
        return self._providers[key]

    def list_providers(self) -> Dict[str, BaseModelProvider]:
        return self._providers


# Instantiate global provider registry and register defaults
provider_registry = ProviderRegistry()

from app.core.config import settings

# Setup config defaults (reading from settings/environment could happen in Phase 6)
mock_config = ProviderConfiguration()
gemini_config = GeminiProviderConfiguration(
    api_key=settings.GEMINI_API_KEY,
    google_api_key=settings.GEMINI_API_KEY
)

provider_registry.register("mock", MockProvider(mock_config))
provider_registry.register("gemini", GeminiProviderAdapter(gemini_config))
