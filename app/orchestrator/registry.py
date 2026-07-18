import uuid
from typing import Dict
from app.orchestrator.interfaces import AgentInterface
from app.orchestrator.context import OrchestratorContext
from app.orchestrator.response import OrchestratorResponse
from app.orchestrator.state import OrchestratorState
from app.orchestrator.exceptions import AgentNotFound
from loguru import logger

class AgentRegistry:
    """
    Plugin-based registry storing registered AgentInterface instances.
    Enables dynamic loading of future agent subclasses.
    """
    def __init__(self):
        self._registry: Dict[str, AgentInterface] = {}

    def register(self, category: str, agent: AgentInterface) -> None:
        """
        Registers an instantiated agent instance mapping to a request category.
        """
        normalized = category.strip().lower()
        self._registry[normalized] = agent
        logger.info(f"Registry: Registered agent '{agent.__class__.__name__}' under category '{normalized}'")

    def get_agent(self, category: str) -> AgentInterface:
        """
        Retrieves registry agent mapping to request type category.
        """
        normalized = category.strip().lower()
        if normalized not in self._registry:
            logger.error(f"Registry: Agent lookup failed for category '{category}'")
            raise AgentNotFound(f"No registered agent plugin matches category '{category}'")
        return self._registry[normalized]


class BaseMockAgent(AgentInterface):
    """
    Generic mock agent implementing standard contract callbacks.
    """
    def __init__(self, name: str, category: str):
        self._name = name
        self._category = category

    async def initialize(self) -> None:
        logger.debug(f"Agent [{self._name}]: Initialising resources...")

    async def validate(self, context: OrchestratorContext) -> bool:
        logger.debug(f"Agent [{self._name}]: Validating execution parameters context...")
        return True

    async def execute(self, context: OrchestratorContext) -> OrchestratorResponse:
        logger.info(f"Agent [{self._name}]: Initiating mock processing pipeline...")
        # Returns standard orchestrator format directly
        return OrchestratorResponse(
            request_id=context.request_id,
            workflow_id=uuid.uuid4(),
            status=OrchestratorState.COMPLETED,
            selected_agent=self._name,
            execution_time=0.05,
            result={
                "status": "success",
                "processed_by": self._name,
                "category": self._category,
                "message": f"Orchestrator mock logic executed successfully by {self._name}."
            },
            warnings=[],
            errors=[],
            metadata={"agent_class": self.__class__.__name__},
            trace_id=uuid.uuid4()
        )

    async def cleanup(self) -> None:
        logger.debug(f"Agent [{self._name}]: Cleaning up active connections...")

    async def health(self) -> dict:
        return {"status": "healthy", "agent": self._name}

    async def metadata(self) -> dict:
        return {"name": self._name, "category": self._category}


# Placeholder Agent classes matching all categories
class SecurityAgent(BaseMockAgent):
    def __init__(self):
        super().__init__("SecurityAgent", "security")

class CrowdAgent(BaseMockAgent):
    def __init__(self):
        super().__init__("CrowdAgent", "crowd")

class MedicalAgent(BaseMockAgent):
    def __init__(self):
        super().__init__("MedicalAgent", "medical")

class ParkingAgent(BaseMockAgent):
    def __init__(self):
        super().__init__("ParkingAgent", "parking")

class TicketingAgent(BaseMockAgent):
    def __init__(self):
        super().__init__("TicketingAgent", "ticketing")

class MaintenanceAgent(BaseMockAgent):
    def __init__(self):
        super().__init__("MaintenanceAgent", "maintenance")

class NavigationAgent(BaseMockAgent):
    def __init__(self):
        super().__init__("NavigationAgent", "navigation")

class EmergencyAgent(BaseMockAgent):
    def __init__(self):
        super().__init__("EmergencyAgent", "emergency")


# Instantiate registry singleton and populate placeholder registrations
agent_registry = AgentRegistry()
agent_registry.register("security", SecurityAgent())
agent_registry.register("crowd", CrowdAgent())
agent_registry.register("medical", MedicalAgent())
agent_registry.register("parking", ParkingAgent())
agent_registry.register("ticketing", TicketingAgent())
agent_registry.register("maintenance", MaintenanceAgent())
agent_registry.register("navigation", NavigationAgent())
agent_registry.register("emergency", EmergencyAgent())
