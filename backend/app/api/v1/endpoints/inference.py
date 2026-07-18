from typing import Dict, List, Optional
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from app.inference.engine import inference_engine
from app.providers.requests.response import ProviderResponse
from app.inference.exceptions import InferenceEngineException
from loguru import logger

router = APIRouter()

# Schema for test endpoint input
class InferenceTestRequest(BaseModel):
    user_prompt: str = Field(..., description="Prompt string input")
    system_prompt: Optional[str] = Field(default="You are a VIP stadium command assistant.")
    context: Optional[dict] = Field(default_factory=dict)
    capabilities_required: Optional[List[str]] = Field(default_factory=list)


@router.post("/test", response_model=ProviderResponse, status_code=status.HTTP_200_OK)
async def test_inference(payload: InferenceTestRequest):
    """
    Executes a test inference request passing through:
    Prompt Build -> Context Build -> Provider Selection (Mock) -> Output Validation.
    """
    logger.info("API: Received prompt trigger for inference pipeline test.")
    try:
        return await inference_engine.execute_inference(
            user_prompt=payload.user_prompt,
            system_prompt=payload.system_prompt,
            context=payload.context,
            capabilities_required=payload.capabilities_required
        )
    except InferenceEngineException as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=e.message
        )
    except Exception as e:
        logger.exception(f"API: Inference engine execution failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
