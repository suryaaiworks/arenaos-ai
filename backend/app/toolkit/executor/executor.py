from typing import Any, Dict
from app.toolkit.tasks import ToolTask
from app.toolkit.executor.results import ToolResult
from app.toolkit.executor.pipeline import ToolExecutionPipeline
from app.toolkit.base.tool import BaseTool
from loguru import logger

class ToolExecutor:
    """
    Coordinates execution parameters and pipelines runs for tools.
    """
    def __init__(self):
        self._pipeline = ToolExecutionPipeline()

    async def execute(self, task: ToolTask, tool: BaseTool) -> ToolResult:
        logger.info(f"ToolExecutor: Dispatching task to execution pipeline...")
        return await self._pipeline.run(task, tool)
