from abc import ABC, abstractmethod
from typing import Any, Dict

class BaseTool(ABC):
    """
    Contract interface representing a tool executable by autonomous agents.
    """
    
    @abstractmethod
    async def initialize(self) -> None:
        """
        Setup database connections or files required on tool load.
        """
        pass

    @abstractmethod
    async def validate(self, params: Dict[str, Any]) -> bool:
        """
        Validates the params payload structure before tool execution.
        """
        pass

    @abstractmethod
    async def execute(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """
        Runs the core tool utility logic.
        """
        pass

    @abstractmethod
    async def cleanup(self) -> None:
        """
        Frees active connections/sockets on task finalization.
        """
        pass

    @abstractmethod
    async def metadata(self) -> dict:
        """
        Returns static tool definitions (name, description, params schemas).
        """
        pass

    @abstractmethod
    async def health(self) -> dict:
        """
        Reports operational wellness status diagnostics.
        """
        pass
