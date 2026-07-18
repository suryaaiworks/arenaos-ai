from typing import List
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from app.providers.manager.provider_manager import provider_manager
from app.providers.manager.registry import provider_registry
from app.providers.requests.request import ProviderRequest
from app.providers.requests.response import ProviderResponse
from app.providers.base.exceptions import ProviderException
from loguru import logger

router = APIRouter()

# Schema for mock post endpoint
class MockPromptRequest(BaseModel):
    user_prompt: str = Field(..., description="Prompt string input")
    system_prompt: str = Field(default="You are a stadium command helper.")
    temperature: float = Field(default=0.7)


@router.get("", response_model=List[dict])
async def list_providers_metadata():
    """
    Returns metadata summaries for all registered model providers.
    """
    logger.info("API: Querying list of registered providers.")
    p_map = provider_registry.list_providers()
    summaries = []
    for name, adapter in p_map.items():
        meta = await adapter.metadata()
        summaries.append({
            "name": name,
            "metadata": meta,
            "active": name == provider_manager.get_active_provider_name()
        })
    return summaries


@router.get("/health", response_model=List[dict])
async def check_providers_health():
    """
    Gathers diagnostics reports from active and inactive adapters.
    """
    logger.info("API: Auditing health parameters across provider registry.")
    return await provider_manager.check_all_health()


@router.post("/select/{provider_name}", status_code=status.HTTP_200_OK)
async def select_active_provider(provider_name: str):
    """
    Sets the active selected provider context model.
    """
    logger.info(f"API: Switching active provider parameter selection to '{provider_name}'")
    try:
        provider_manager.select_provider(provider_name)
        return {
            "status": "success",
            "active_provider": provider_manager.get_active_provider_name()
        }
    except KeyError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Provider '{provider_name}' not found. Registered choices: {list(provider_registry.list_providers().keys())}"
        )


@router.post("/mock", response_model=ProviderResponse, status_code=status.HTTP_200_OK)
async def test_mock_generation(payload: MockPromptRequest):
    """
    Executes a test prompt generation query directly through the MockProvider.
    """
    logger.info("API: Executing test mock prompt query...")
    try:
        mock_adapter = provider_registry.get_provider("mock")
        req = ProviderRequest(
            user_prompt=payload.user_prompt,
            system_prompt=payload.system_prompt,
            temperature=payload.temperature
        )
        return await mock_adapter.generate(req)
    except ProviderException as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=e.message
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
