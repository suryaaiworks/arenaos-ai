import time
import uuid
from typing import Any, Dict
from app.toolkit.tasks import ToolTask
from app.toolkit.executor.results import ToolResult
from app.toolkit.base.tool import BaseTool
from app.toolkit.security.permissions import PermissionValidator
from app.toolkit.security.sandbox import ToolSandbox
from loguru import logger

class ToolExecutionPipeline:
    """
    Replaceable Tool Execution Pipeline.
    Coordinates validation, permission checks, sandbox execution, output formatting,
    and observability metrics collection.
    """
    def __init__(
        self,
        permission_validator: PermissionValidator = None,
        sandbox: ToolSandbox = None
    ):
        self.permission_validator = permission_validator or PermissionValidator()
        self.sandbox = sandbox or ToolSandbox()

    async def run(self, task: ToolTask, tool: BaseTool) -> ToolResult:
        """
        Runs the tool task payload execution pipeline.
        Each step is decoupled and replaceable.
        """
        logger.info(f"ToolPipeline: Received execution request for tool '{task.tool_name}'...")
        start_time = time.time()
        errors = []
        warnings = []

        try:
            # Step 1: Validate payload parameters
            logger.debug("ToolPipeline: Validating parameter payload...")
            valid = await tool.validate(task.payload)
            if not valid:
                logger.error("ToolPipeline: Input parameters failed schema validation.")
                return self._create_error_result(task, tool, "Input validation checks failed.", start_time)

            # Step 2: Permission check
            logger.debug("ToolPipeline: Validating permissions authorization...")
            allowed = self.permission_validator.check_permissions(
                context_permissions=task.permissions,
                required_permissions=tool.manifest.permissions
            )
            if not allowed:
                logger.error(f"ToolPipeline: Access denied. Missing required scopes: {tool.manifest.permissions}")
                return self._create_error_result(
                    task, tool, 
                    f"Access Denied: Missing permissions: {tool.manifest.permissions}", 
                    start_time,
                    status="forbidden"
                )

            # Step 3: Load Tool
            logger.debug("ToolPipeline: Initialising tool context states...")
            await tool.initialize()

            # Step 4: Execute Tool in Sandbox
            logger.debug("ToolPipeline: Executing tool inside boundary sandbox...")
            # We bind tool.execute directly and execute it
            result_data = await self.sandbox.run_in_sandbox(tool.execute, task.payload)

            # Step 5: Clean up tool
            await tool.cleanup()

            latency = time.time() - start_time
            logger.info(f"ToolPipeline: Tool '{task.tool_name}' executed successfully in {latency:.4f}s")

            # Step 6: Generate standard response & record metrics
            tool.exec_count += 1
            tool.total_latency += latency
            tool.last_exec_time = time.time()

            return ToolResult(
                execution_id=uuid.uuid4(),
                tool_id=tool.manifest.tool_id,
                tool_name=tool.manifest.name,
                tool_version=tool.manifest.version,
                status="completed",
                latency=latency,
                result=result_data,
                errors=[],
                warnings=[],
                metadata=task.metadata,
                trace_id=task.request_id
            )

        except Exception as e:
            logger.exception(f"ToolPipeline: Failure during tool execution: {e}")
            await tool.cleanup()
            return self._create_error_result(task, tool, str(e), start_time)

    def _create_error_result(
        self, 
        task: ToolTask, 
        tool: BaseTool, 
        err_msg: str, 
        start_time: float,
        status: str = "failed"
    ) -> ToolResult:
        latency = time.time() - start_time
        return ToolResult(
            execution_id=uuid.uuid4(),
            tool_id=tool.manifest.tool_id if tool else uuid.UUID(int=0),
            tool_name=tool.manifest.name if tool else task.tool_name,
            tool_version=tool.manifest.version if tool else "1.0.0",
            status=status,
            latency=latency,
            result={},
            errors=[err_msg],
            warnings=[],
            metadata=task.metadata,
            trace_id=task.request_id
        )
