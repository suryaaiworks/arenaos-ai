from typing import Dict, List
from fastapi import APIRouter, HTTPException, status
from app.agents.manager.agent_manager import agent_manager
from app.agents.manager.registry import agent_registry
from loguru import logger

router = APIRouter()

@router.get("", response_model=List[dict])
async def list_agents():
    """
    Returns registered agent manifests.
    """
    logger.info("API: Listing all discovered agent manifests.")
    agents_map = agent_registry.list_agents()
    manifests = []
    for agent in agents_map.values():
        manifests.append(await agent.metadata())
    return manifests


@router.get("/health", response_model=List[dict])
async def list_agents_health():
    """
    Gathers diagnostic operational heartbeats.
    """
    logger.info("API: Auditing health metrics across registered agents.")
    return await agent_manager.get_all_health()


@router.post("/{agent_name}/start", status_code=status.HTTP_200_OK)
async def start_agent_endpoint(agent_name: str):
    """
    Initializes and starts the requested agent instance.
    """
    logger.info(f"API: Initiating start command for agent '{agent_name}'")
    try:
        await agent_manager.start_agent(agent_name)
        return {"status": "started", "agent": agent_name}
    except KeyError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Agent '{agent_name}' not found."
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.post("/{agent_name}/stop", status_code=status.HTTP_200_OK)
async def stop_agent_endpoint(agent_name: str):
    """
    Powers down the requested agent instance.
    """
    logger.info(f"API: Initiating stop command for agent '{agent_name}'")
    try:
        await agent_manager.stop_agent(agent_name)
        return {"status": "stopped", "agent": agent_name}
    except KeyError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Agent '{agent_name}' not found."
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.post("/{agent_name}/restart", status_code=status.HTTP_200_OK)
async def restart_agent_endpoint(agent_name: str):
    """
    Restarts the requested agent instance.
    """
    logger.info(f"API: Initiating restart command for agent '{agent_name}'")
    try:
        await agent_manager.restart_agent(agent_name)
        return {"status": "restarted", "agent": agent_name}
    except KeyError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Agent '{agent_name}' not found."
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
