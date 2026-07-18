from typing import Any, Dict
from app.agents.tools.registry import ToolRegistry
from loguru import logger

class ToolExecutor:
    """
    Executes tool plugins registered under ToolRegistry.
    Handles lifecycles, validation checks, and execution logs.
    """
    def __init__(self, registry: ToolRegistry):
        self.registry = registry

    async def execute_tool(self, tool_name: str, params: Dict[str, Any]) -> Dict[str, Any]:
        """
        Loads, validates, executes, and cleans up the requested tool.
        """
        tool = self.registry.get_tool(tool_name)
        logger.info(f"ToolExecutor: Running tool '{tool_name}'...")
        
        await tool.initialize()
        valid = await tool.validate(params)
        if not valid:
            await tool.cleanup()
            raise ValueError(f"Parameters validation check failed for tool '{tool_name}'")
            
        try:
            result = await tool.execute(params)
            await tool.cleanup()
            return result
        except Exception as e:
            logger.error(f"ToolExecutor: Error executing tool '{tool_name}': {e}")
            await tool.cleanup()
            raise e
