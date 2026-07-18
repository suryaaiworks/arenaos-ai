from typing import Dict
from app.agents.base.base_agent import BaseAgent
from loguru import logger

class AgentRegistry:
    """
    Registry container mapping active running BaseAgent instances.
    """
    def __init__(self):
        self._agents: Dict[str, BaseAgent] = {}

    def register(self, agent: BaseAgent) -> None:
        name = agent.manifest.name.lower()
        self._agents[name] = agent
        logger.info(f"AgentRegistry: Registered instance '{agent.manifest.name}' under key '{name}'")

    def unregister(self, name: str) -> None:
        key = name.lower()
        if key in self._agents:
            del self._agents[key]
            logger.info(f"AgentRegistry: Unregistered instance '{name}'")

    def get_agent(self, name: str) -> BaseAgent:
        key = name.lower()
        if key not in self._agents:
            raise KeyError(f"Agent '{name}' not found in registry.")
        return self._agents[key]

    def list_agents(self) -> Dict[str, BaseAgent]:
        return self._agents


# Instantiate registry singleton
agent_registry = AgentRegistry()
