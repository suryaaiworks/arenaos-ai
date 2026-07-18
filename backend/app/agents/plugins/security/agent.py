import time
import uuid
from app.agents.base.base_agent import BaseAgent
from app.agents.base.manifest import AgentManifest
from app.agents.base.config import AgentConfiguration
from app.orchestrator.context import OrchestratorContext
from app.orchestrator.response import OrchestratorResponse
from app.orchestrator.state import OrchestratorState
from app.agents.plugins.security.workflows import SecurityWorkflowRunner
from app.agents.plugins.security.schemas import SecurityAnalyzeRequest
from app.agents.plugins.security.health import SecurityHealthChecker
from loguru import logger

class SecurityAgent(BaseAgent):
    """
    Autonomous security surveillance threat containment AI Agent.
    """
    def __init__(self, manifest: AgentManifest, config: AgentConfiguration):
        super().__init__(manifest, config)
        self._runner = SecurityWorkflowRunner()
        self._health_checker = SecurityHealthChecker()

    async def execute(self, context: OrchestratorContext) -> OrchestratorResponse:
        logger.info(f"SecurityAgent: Received execution request for prompt '{context.prompt}'...")
        start_time = time.time()
        
        try:
            # Map request to agent schemas
            req = SecurityAnalyzeRequest(
                session_id=str(context.request_id),
                incident=context.prompt,
                context=context.context or {}
            )
            
            # Execute workflow
            report = await self._runner.execute_workflow(req)
            
            latency = time.time() - start_time
            return OrchestratorResponse(
                request_id=context.request_id,
                workflow_id=context.workflow_id,
                status=OrchestratorState.COMPLETED,
                selected_agent=self.manifest.name,
                execution_time=latency,
                result=report.model_dump(),
                warnings=[],
                errors=[],
                metadata=context.metadata,
                trace_id=context.request_id
            )
        except Exception as e:
            latency = time.time() - start_time
            return OrchestratorResponse(
                request_id=context.request_id,
                workflow_id=context.workflow_id,
                status=OrchestratorState.FAILED,
                selected_agent=self.manifest.name,
                execution_time=latency,
                result={},
                warnings=[],
                errors=[str(e)],
                metadata=context.metadata,
                trace_id=context.request_id
            )

    async def health(self) -> dict:
        """
        Satisfies BaseAgent.health interface checking.
        """
        base_h = await super().health()
        rep = self._health_checker.get_health_report()
        base_h.update(rep)
        return base_h
