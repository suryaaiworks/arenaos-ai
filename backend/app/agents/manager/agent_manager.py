from typing import Dict, List
from app.agents.base.base_agent import BaseAgent
from app.agents.manager.registry import agent_registry
from app.agents.manager.lifecycle_manager import AgentLifecycleManager
from app.agents.manager.loader import PluginLoader
from loguru import logger

class AgentManager:
    """
    Coordinates runtime operational statuses, health pings, and autodiscovery pipelines.
    """
    def __init__(self):
        self._registry = agent_registry
        self._loader = PluginLoader()
        self._lifecycles: Dict[str, AgentLifecycleManager] = {}

    def discover_agents(self) -> None:
        """
        Triggers plugin loader folder scans.
        """
        self._loader.discover_and_load_plugins()

    def get_lifecycle_manager(self, name: str) -> AgentLifecycleManager:
        key = name.lower()
        if key not in self._lifecycles:
            agent = self._registry.get_agent(name)
            self._lifecycles[key] = AgentLifecycleManager(agent)
        return self._lifecycles[key]

    async def start_agent(self, name: str) -> None:
        mgr = self.get_lifecycle_manager(name)
        await mgr.initialize_agent()
        await mgr.start_agent()
        logger.info(f"AgentManager: Started agent '{name}' successfully.")

    async def stop_agent(self, name: str) -> None:
        mgr = self.get_lifecycle_manager(name)
        await mgr.shutdown_agent()
        logger.info(f"AgentManager: Stopped agent '{name}' successfully.")

    async def restart_agent(self, name: str) -> None:
        mgr = self.get_lifecycle_manager(name)
        await mgr.restart_agent()
        logger.info(f"AgentManager: Restarted agent '{name}' successfully.")

    async def get_all_health(self) -> List[dict]:
        """
        Triggers diagnostics pings across all registered plugins.
        """
        logger.debug("AgentManager: Performing health audits across registry...")
        report = []
        for agent in self._registry.list_agents().values():
            report.append(await agent.health())
        return report


# Instantiate central AgentManager singleton
agent_manager = AgentManager()
