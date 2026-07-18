from abc import ABC, abstractmethod
from typing import Any, List
from app.providers.requests.request import ProviderRequest
from app.providers.requests.response import ProviderResponse
from app.providers.base.config import ProviderConfiguration

class BaseModelProvider(ABC):
    """
    Contract interface representing a vendor-independent AI model provider wrapper.
    """
    def __init__(self, config: ProviderConfiguration):
        self.config = config

    @abstractmethod
    async def initialize(self) -> None:
        pass

    @abstractmethod
    async def health(self) -> dict:
        pass

    @abstractmethod
    async def generate(self, request: ProviderRequest) -> ProviderResponse:
        pass

    @abstractmethod
    async def stream(self, request: ProviderRequest) -> Any:
        pass

    @abstractmethod
    async def embed(self, texts: List[str]) -> List[List[float]]:
        pass

    @abstractmethod
    async def count_tokens(self, text: str) -> int:
        pass

    @abstractmethod
    async def validate_request(self, request: ProviderRequest) -> bool:
        pass

    @abstractmethod
    async def cleanup(self) -> None:
        pass

    @abstractmethod
    async def metadata(self) -> dict:
        pass
