from app.toolkit.tasks import ToolTask
from app.toolkit.executor.results import ToolResult
from app.toolkit.executor.executor import ToolExecutor
from app.toolkit.base.tool import BaseTool
from loguru import logger

class ToolDispatcher:
    """
    Dispatches tool execution requests from the agent workflows down to the tool executor.
    """
    def __init__(self):
        self._executor = ToolExecutor()

    async def dispatch_task(self, task: ToolTask, tool: BaseTool) -> ToolResult:
        logger.info(f"ToolDispatcher: Directing execution request for tool '{tool.manifest.name}'...")
        return await self._executor.execute(task, tool)
