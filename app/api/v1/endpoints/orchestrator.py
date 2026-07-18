from typing import Any, Dict, Optional
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from app.orchestrator.arena_mind import arena_mind
from app.orchestrator.exceptions import ArenaMindException
from app.orchestrator.response import OrchestratorResponse
from loguru import logger

router = APIRouter()

# Schema for test endpoint input
class TestRequestSchema(BaseModel):
    request_type: str = Field(..., description="Category of the request (e.g. security, crowd, medical)")
    message: str = Field(..., description="Alert text payload")
    priority: str = Field(default="medium")
    metadata: dict = Field(default_factory=dict)
    request_source: str = Field(default="api")
    language: str = Field(default="en")


class TestResponseSchema(BaseModel):
    status: str
    selected_agent: str
    workflow: str
    pipeline_result: OrchestratorResponse


@router.post("/test", response_model=TestResponseSchema, status_code=status.HTTP_202_ACCEPTED)
async def test_orchestrator(payload: TestRequestSchema):
    """
    Temporary validation API executing the full ArenaMind orchestration pipeline
    (Validation -> Classification -> Context -> Selection -> Workflow -> Response).
    """
    logger.info(f"API: Received request category '{payload.request_type}' for test orchestrator.")
    try:
        # Execute the pipeline with raw payload dict
        result = await arena_mind.process_request(payload.model_dump())
        
        # Return expected structured metadata
        return {
            "status": "accepted",
            "selected_agent": result.selected_agent,
            "workflow": "started",
            "pipeline_result": result
        }
    except ArenaMindException as e:
        logger.error(f"API: ArenaMind orchestrator error: {e.message}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=e.message
        )
    except Exception as e:
        logger.exception(f"API: Unexpected orchestrator error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
