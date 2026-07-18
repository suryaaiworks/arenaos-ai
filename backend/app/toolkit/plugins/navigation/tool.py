from typing import Any, Dict
from app.toolkit.base.tool import BaseTool
from loguru import logger

class NavigationTool(BaseTool):
    """
    Mock indoor pathfinding and wayfinding directions generator tool plugin.
    """
    async def execute(self, params: Dict[str, Any]) -> Dict[str, Any]:
        logger.info(f"NavigationTool: Computing route from gate query '{params.get('query')}'...")
        return {
            "origin": "Gate 3",
            "destination": "Section 104 Row D",
            "estimated_walk_seconds": 180,
            "path": ["Gate 3", "Concourse A Escalator", "Section 104 Entryway"]
        }
