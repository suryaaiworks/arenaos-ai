from typing import Any, Dict
from app.agents.base.state import AgentState
from loguru import logger

class AgentHealthTracker:
    """
    Heartbeat and metrics tracking module for individual agent instances.
    """
    def __init__(self, agent_name: str, version: str):
        self.agent_name = agent_name
        self.version = version
        self.health_status: str = "green"
        self.diagnostics_ok: bool = True

    def perform_heartbeat(self, state: AgentState) -> Dict[str, Any]:
        """
        Generates heartbeat metadata trace payload.
        """
        logger.debug(f"Health: Heartbeat triggered for {self.agent_name}")
        return {
            "agent": self.agent_name,
            "version": self.version,
            "state": state.value,
            "health": self.health_status,
            "diagnostics_ok": self.diagnostics_ok
        }
