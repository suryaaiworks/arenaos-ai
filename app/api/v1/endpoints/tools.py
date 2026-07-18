from typing import List
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from app.toolkit.registry.registry import tool_registry
from app.toolkit.tasks import ToolTask
from app.toolkit.executor.executor import ToolExecutor
from app.toolkit.executor.results import ToolResult
from loguru import logger

router = APIRouter()

# Schema for execution request
class ToolExecuteRequest(BaseModel):
    payload: dict = Field(default_factory=dict)
    permissions: List[str] = Field(default_factory=lambda: ["Read Database", "Read Crowd"])
    agent_name: str = Field(default="SecurityAgent")


@router.get("", response_model=List[dict])
async def list_tools():
    """
    Returns registered tool manifests.
    """
    logger.info("API: Listing discovered tools...")
    tools_map = tool_registry.list_tools()
    manifests = []
    for tool in tools_map.values():
        manifests.append(await tool.metadata())
    return manifests


@router.get("/categories", response_model=List[str])
async def list_categories():
    """
    Returns a unique list of tool categories.
    """
    logger.info("API: Filtering tool categories...")
    tools_map = tool_registry.list_tools()
    categories = set()
    for tool in tools_map.values():
        categories.add(tool.manifest.category)
    return sorted(list(categories))


@router.get("/health", response_model=List[dict])
async def list_tools_health():
    """
    Returns health parameters reports for all registered tools.
    """
    logger.info("API: Gathering health heartbeats across toolkit...")
    return await tool_registry.run_all_health_checks()


@router.post("/{tool_name}/execute", response_model=ToolResult, status_code=status.HTTP_200_OK)
async def execute_tool(tool_name: str, req: ToolExecuteRequest):
    """
    Executes a registered tool utilizing the execution pipeline and sandbox.
    """
    logger.info(f"API: Running execution command on tool '{tool_name}'...")
    try:
        tool = tool_registry.get_tool(tool_name)
        executor = ToolExecutor()
        task = ToolTask(
            tool_name=tool_name,
            agent_name=req.agent_name,
            payload=req.payload,
            permissions=req.permissions
        )
        return await executor.execute(task, tool)
    except KeyError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Tool '{tool_name}' not found in registry."
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
