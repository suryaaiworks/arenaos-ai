from loguru import logger

class ProviderSelector:
    """
    Selects and manages the active AI Model Provider.
    """
    def __init__(self, default_provider: str = "mock"):
        self._active_provider: str = default_provider.strip().lower()

    def get_active_provider_name(self) -> str:
        return self._active_provider

    def select_active_provider(self, name: str) -> None:
        """
        Switches the active provider context.
        """
        old = self._active_provider
        self._active_provider = name.strip().lower()
        logger.info(f"ProviderSelector: Active provider switched from '{old}' to '{self._active_provider}'")
