from app.agents.base.base_agent import BaseAgent
from app.agents.base.state import AgentState
from loguru import logger

class AgentLifecycleManager:
    """
    Manages transitions and state controls for individual active agent instances.
    """
    def __init__(self, agent: BaseAgent):
        self.agent = agent

    async def initialize_agent(self) -> None:
        logger.info(f"LifecycleManager: Initialising agent '{self.agent.manifest.name}'...")
        await self.agent.initialize()

    async def start_agent(self) -> None:
        logger.info(f"LifecycleManager: Starting execution loops for '{self.agent.manifest.name}'...")
        self.agent.context.state = AgentState.RUNNING

    async def pause_agent(self) -> None:
        logger.info(f"LifecycleManager: Pausing execution for '{self.agent.manifest.name}'...")
        self.agent.context.state = AgentState.WAITING

    async def resume_agent(self) -> None:
        logger.info(f"LifecycleManager: Resuming execution for '{self.agent.manifest.name}'...")
        self.agent.context.state = AgentState.RUNNING

    async def restart_agent(self) -> None:
        logger.info(f"LifecycleManager: Restarting agent '{self.agent.manifest.name}'...")
        await self.agent.shutdown()
        await self.agent.initialize()
        self.agent.context.state = AgentState.RUNNING

    async def shutdown_agent(self) -> None:
        logger.warning(f"LifecycleManager: Shutting down agent '{self.agent.manifest.name}'...")
        await self.agent.shutdown()
