from abc import ABC, abstractmethod
from typing import Any, List
from loguru import logger

class HistoryCompressorInterface(ABC):
    """
    Abstract interface for conversation history compression (summarisation / trimming).
    """
    @abstractmethod
    async def compress_history(self, history: List[Any]) -> List[Any]:
        pass
