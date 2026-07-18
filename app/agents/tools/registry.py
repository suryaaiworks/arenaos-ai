from typing import Dict
from app.agents.tools.tool import BaseTool
from loguru import logger

class ToolRegistry:
    """
    Registry for dynamic registration of executable tool plugins.
    """
    def __init__(self):
        self._tools: Dict[str, BaseTool] = {}

    def register(self, tool: BaseTool) -> None:
        """
        Registers a tool plugin instance.
        """
        metadata = tool.metadata()
        name = metadata["name"]
        self._tools[name] = tool
        logger.info(f"ToolRegistry: Registered tool '{name}'")

    def get_tool(self, name: str) -> BaseTool:
        """
        Retrieves registered tool instance by name.
        """
        if name not in self._tools:
            raise KeyError(f"Tool '{name}' not found in registry.")
        return self._tools[name]
