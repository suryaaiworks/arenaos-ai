from abc import ABC, abstractmethod
from app.orchestrator.context import OrchestratorContext
from app.orchestrator.response import OrchestratorResponse

class AgentInterface(ABC):
    """
    Strict contract interface representing autonomous ArenaOS AI agents.
    Every plugin agent must inherit and implement these lifecycle hooks.
    """
    
    @abstractmethod
    async def initialize(self) -> None:
        """
        Runs agent-specific resources loading on pipeline initialization.
        """
        pass

    @abstractmethod
    async def validate(self, context: OrchestratorContext) -> bool:
        """
        Checks validation parameters to verify if the agent can process this context request.
        """
        pass

    @abstractmethod
    async def execute(self, context: OrchestratorContext) -> OrchestratorResponse:
        """
        Contains core execution instructions logic for the agent.
        """
        pass

    @abstractmethod
    async def cleanup(self) -> None:
        """
        Frees agent resources (e.g. connections, threads) on pipeline finalization.
        """
        pass

    @abstractmethod
    async def health(self) -> dict:
        """
        Reports operational metrics and diagnostics status.
        """
        pass

    @abstractmethod
    async def metadata(self) -> dict:
        """
        Returns static agent definition (e.g. name, description, capabilities, tags).
        """
        pass
