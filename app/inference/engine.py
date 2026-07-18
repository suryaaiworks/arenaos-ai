from typing import Any, Dict, List, Optional
from app.inference.pipeline import InferencePipeline
from app.inference.policies import InferencePolicies
from app.providers.requests.response import ProviderResponse
from loguru import logger

class InferenceEngine:
    """
    Vendor-independent Inference Engine.
    Sits between the Agent Framework and the Model Provider Layer,
    decoupling prompt formats, contexts merging, and providers management.
    """
    def __init__(self):
        self._pipeline = InferencePipeline()

    async def execute_inference(
        self,
        user_prompt: str,
        system_prompt: Optional[str] = None,
        developer_prompt: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
        short_mem: Optional[Dict[str, Any]] = None,
        long_mem: Optional[Dict[str, Any]] = None,
        session_mem: Optional[Dict[str, Any]] = None,
        history: Optional[List[Dict[str, Any]]] = None,
        capabilities_required: Optional[List[str]] = None,
        policies: Optional[InferencePolicies] = None
    ) -> ProviderResponse:
        """
        Receives prompt, context, memories, tools capabilities, and policies.
        Runs prompt builder compiles, retrieves provider mappings, runs generate and returns result.
        """
        logger.info("InferenceEngine: Executing inference request...")
        return await self._pipeline.execute(
            user_prompt=user_prompt,
            system_prompt=system_prompt,
            developer_prompt=developer_prompt,
            context=context,
            short_mem=short_mem,
            long_mem=long_mem,
            session_mem=session_mem,
            history=history,
            capabilities_required=capabilities_required,
            policies=policies
        )


# Instantiate InferenceEngine singleton
inference_engine = InferenceEngine()
