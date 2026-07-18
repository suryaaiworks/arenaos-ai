from typing import Dict, List
from app.toolkit.base.tool import BaseTool
from loguru import logger

class ToolRegistry:
    """
    Registry container managing active BaseTool plugins instances.
    """
    def __init__(self):
        self._tools: Dict[str, BaseTool] = {}

    def register(self, tool: BaseTool) -> None:
        name = tool.manifest.name.lower()
        self._tools[name] = tool
        logger.info(f"ToolRegistry: Registered tool '{tool.manifest.name}' under key '{name}'")

    def unregister(self, name: str) -> None:
        key = name.lower()
        if key in self._tools:
            del self._tools[key]
            logger.info(f"ToolRegistry: Unregistered tool '{name}'")

    def get_tool(self, name: str) -> BaseTool:
        key = name.lower()
        if key not in self._tools:
            raise KeyError(f"Tool '{name}' not found in registry.")
        return self._tools[key]

    def list_tools(self) -> Dict[str, BaseTool]:
        return self._tools

    def search_tools(self, query: str) -> List[BaseTool]:
        """
        Searches tools descriptions or names matching query string.
        """
        q = query.lower()
        results = []
        for t in self._tools.values():
            if q in t.manifest.name.lower() or q in t.manifest.description.lower():
                results.append(t)
        return results

    def filter_by_category(self, category: str) -> List[BaseTool]:
        c = category.lower()
        return [t for t in self._tools.values() if t.manifest.category.lower() == c]

    async def run_all_health_checks(self) -> List[dict]:
        report = []
        for t in self._tools.values():
            report.append(await t.health())
        return report


# Instantiate registry singleton
tool_registry = ToolRegistry()
