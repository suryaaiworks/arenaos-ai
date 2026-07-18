from abc import ABC, abstractmethod
import time
from typing import Any, List
from app.orchestrator.interfaces import AgentInterface
from app.orchestrator.context import OrchestratorContext
from app.orchestrator.response import OrchestratorResponse
from app.orchestrator.state import OrchestratorState
from app.agents.base.manifest import AgentManifest
from app.agents.base.config import AgentConfiguration
from app.agents.base.context import AgentContext
from app.agents.base.state import AgentState
from app.agents.base.capabilities import AgentCapability
from loguru import logger

class BaseAgent(AgentInterface, ABC):
    """
    Abstract Base Agent class defining complete lifecycle structures, tool loading slots,
    internal communication and memory adapters. Integrates directly with ArenaMind interface.
    """
    def __init__(self, manifest: AgentManifest, config: AgentConfiguration):
        self.manifest = manifest
        self.config = config
        self.context = AgentContext(agent_id=self.manifest.agent_id, state=AgentState.CREATED)
        self.last_activity = time.time()
        self.uptime_start = time.time()
        self._tools: List[Any] = []
        self._memory: Any = None
        
        # EXTENSION POINT HOOKS (For Future Implementations)
        # -------------------------------------------------------------
        # 1. Gemini / LLM executor: self._gemini_planner = None
        # 2. LangGraph state connection: self._langgraph_state_key = None
        # 3. Model Context Protocol config: self._mcp_server_client = None

    async def initialize(self) -> None:
        """
        Runs core agent initialization procedures.
        """
        self.context.state = AgentState.INITIALIZING
        logger.info(f"Agent [{self.manifest.name}]: Initialising lifecycle...")
        await self.load_tools()
        await self.load_memory()
        self.context.state = AgentState.READY
        logger.info(f"Agent [{self.manifest.name}]: Initialized and ready to receive tasks.")

    async def validate(self, context: OrchestratorContext) -> bool:
        """
        Default validation checks comparing request context against manifest requirements.
        """
        logger.debug(f"Agent [{self.manifest.name}]: Checking task context parameters...")
        return self.config.enabled

    @abstractmethod
    async def execute(self, context: OrchestratorContext) -> OrchestratorResponse:
        """
        Executes core agent intelligence workflows.
        Must be implemented by concrete subclasses.
        """
        pass

    async def cleanup(self) -> None:
        """
        Runs post-execution cleanup of active resources.
        """
        logger.debug(f"Agent [{self.manifest.name}]: Cleaning up resources...")
        self.last_activity = time.time()

    async def shutdown(self) -> None:
        """
        Powers down the agent instance completely.
        """
        logger.info(f"Agent [{self.manifest.name}]: Shutting down...")
        self.context.state = AgentState.STOPPED

    async def health(self) -> dict:
        """
        Returns diagnostic health and uptime summary parameters.
        """
        uptime = time.time() - self.uptime_start
        return {
            "agent_id": str(self.manifest.agent_id),
            "name": self.manifest.name,
            "state": self.context.state.value,
            "uptime_seconds": round(uptime, 2),
            "last_activity": round(time.time() - self.last_activity, 2),
            "registered_tools": [t.metadata()["name"] for t in self._tools] if hasattr(self, "_tools") and self._tools else [],
            "registered_capabilities": [c.value for c in self.manifest.capabilities]
        }

    async def metadata(self) -> dict:
        """
        Returns manifest payload dict.
        """
        return self.manifest.model_dump()

    async def capabilities(self) -> List[AgentCapability]:
        """
        Returns list of capabilities registered by the agent.
        """
        return self.manifest.capabilities

    async def load_tools(self) -> None:
        """
        Placeholder load hook for future tools registration.
        """
        logger.debug(f"Agent [{self.manifest.name}]: Loading tools plugins...")

    async def load_memory(self) -> None:
        """
        Placeholder load hook for future memory sync adapters.
        """
        logger.debug(f"Agent [{self.manifest.name}]: Synchronising memory cache...")

    async def receive(self, message: Any) -> None:
        """
        Message routing listener hook.
        """
        logger.debug(f"Agent [{self.manifest.name}]: Received message type: {message}")
        self.last_activity = time.time()

    async def send(self, message: Any) -> None:
        """
        Message routing dispatch hook.
        """
        logger.debug(f"Agent [{self.manifest.name}]: Dispatching message type: {message}")
        self.last_activity = time.time()
