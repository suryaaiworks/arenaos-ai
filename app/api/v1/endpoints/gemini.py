from fastapi import APIRouter, HTTPException, status
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from app.providers.manager.registry import provider_registry
from app.providers.requests.request import ProviderRequest
from app.providers.requests.response import ProviderResponse
from app.toolkit.registry.registry import tool_registry
from loguru import logger
import json

router = APIRouter()

class GeminiChatRequest(BaseModel):
    prompt: str = Field(..., description="Prompt string query")
    system_prompt: str = Field(default="You are a stadium command helper.")
    temperature: float = Field(default=0.7)


@router.get("/health", response_model=dict)
async def get_gemini_health():
    """
    Returns structured Gemini health report verifying API key validation.
    """
    logger.info("API: Auditing Gemini connection health...")
    try:
        provider = provider_registry.get_provider("gemini")
        return await provider.health()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.post("/chat", response_model=ProviderResponse)
async def chat_gemini(req: GeminiChatRequest):
    """
    Executes a standard chat content generation request using the official SDK adapter.
    """
    logger.info("API: Forwarding prompt request to Gemini adapter...")
    try:
        provider = provider_registry.get_provider("gemini")
        p_req = ProviderRequest(
            user_prompt=req.prompt,
            system_prompt=req.system_prompt,
            temperature=req.temperature
        )
        return await provider.generate_response(p_req)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/tools", response_model=ProviderResponse)
async def chat_gemini_tools(req: GeminiChatRequest):
    """
    Exposes registered tools to Gemini to verify Native Function Calling.
    """
    logger.info("API: Forwarding function calling prompt request to Gemini adapter...")
    try:
        provider = provider_registry.get_provider("gemini")
        
        # Pull all registered tools from the framework
        all_tools = tool_registry.list_tools()
        tools_manifests = [t.manifest.model_dump() for t in all_tools.values()]
        
        p_req = ProviderRequest(
            user_prompt=req.prompt,
            system_prompt=req.system_prompt,
            temperature=req.temperature,
            tools=tools_manifests
        )
        return await provider.generate_response(p_req)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/stream")
async def chat_gemini_stream(req: GeminiChatRequest):
    """
    Returns incremental chunk stream results via Server-Sent Events (SSE).
    """
    logger.info("API: Forwarding stream request to Gemini adapter...")
    try:
        provider = provider_registry.get_provider("gemini")
        p_req = ProviderRequest(
            user_prompt=req.prompt,
            system_prompt=req.system_prompt,
            temperature=req.temperature
        )
        
        async def stream_generator():
            async for chunk in provider.stream_response(p_req):
                yield f"data: {json.dumps(chunk)}\n\n"

        return StreamingResponse(stream_generator(), media_type="text/event-stream")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
