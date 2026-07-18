from typing import Any, Dict
from app.orchestrator.pipeline import ExecutionPipeline
from app.orchestrator.response import OrchestratorResponse
from loguru import logger

class ArenaMind:
    """
    Central orchestration engine for the ArenaOS AI Smart Stadium platform.
    Manages request pipeline coordination, logging, and response unified delivery.
    """
    def __init__(self):
        self._pipeline = ExecutionPipeline()

    async def process_request(self, payload: Dict[str, Any]) -> OrchestratorResponse:
        """
        Main interface executing incoming requests through the validation and pipeline engines.
        """
        logger.info("ArenaMind: Processing request entry point triggered.")
        return await self._pipeline.run(payload)


# Instantiate central ArenaMind singleton
arena_mind = ArenaMind()
