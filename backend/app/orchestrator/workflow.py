import asyncio
import time
import uuid
from typing import Any, Callable, Dict, List
from app.orchestrator.context import OrchestratorContext
from app.orchestrator.response import OrchestratorResponse
from app.orchestrator.state import OrchestratorState
from app.orchestrator.interfaces import AgentInterface
from app.orchestrator.events import event_bus
from app.orchestrator.exceptions import WorkflowFailure
from loguru import logger

class WorkflowEngine:
    """
    Lightweight sequential workflow execution engine.
    Includes explicit extension slots for parallel runs, retries, timeouts,
    cancellations, and priority queues.
    """
    
    # EXTENSION SLOTS DEFINITIONS (For Future Implementation)
    # -------------------------------------------------------------
    # 1. Parallel execution: async def execute_parallel(self, steps: List[Callable])
    # 2. Retries helper: async def execute_with_retry(self, step: Callable, max_retries: int)
    # 3. Timeout handler: async def execute_with_timeout(self, step: Callable, timeout_sec: float)
    # 4. Cancellation registry: self._cancelled_workflows: Set[uuid.UUID]
    # 5. Priority queue scheduler: self._priority_scheduler: PriorityQueue

    async def execute_workflow(
        self, 
        context: OrchestratorContext, 
        agent: AgentInterface
    ) -> OrchestratorResponse:
        """
        Executes workflow steps sequentially, tracking latency and firing event triggers.
        """
        workflow_id = uuid.uuid4()
        start_time = time.time()
        
        logger.info(f"Workflow Started: Workflow ID {workflow_id} for request {context.request_id}")
        event_bus.publish("WorkflowStarted", {"workflow_id": workflow_id, "context": context})

        try:
            # Lifecycle hook 1: Initialize Agent
            logger.debug(f"Workflow: Initialising agent lifecycle hooks...")
            await agent.initialize()
            
            # Lifecycle hook 2: Validate context parameters
            logger.debug(f"Workflow: Validating context with agent contract...")
            valid = await agent.validate(context)
            if not valid:
                logger.error(f"Workflow: Context validation failed on agent contract check.")
                raise WorkflowFailure("Agent contract validation failed.")

            # Lifecycle hook 3: Execute Agent logic
            event_bus.publish("AgentDispatched", {"workflow_id": workflow_id, "agent_name": agent.__class__.__name__})
            agent_response = await agent.execute(context)
            event_bus.publish("AgentCompleted", {"workflow_id": workflow_id, "agent_name": agent.__class__.__name__})

            # Lifecycle hook 4: Clean up agent resources
            await agent.cleanup()

            execution_time = time.time() - start_time
            logger.info(f"Workflow Finished: Completed successfully. Duration: {execution_time:.4f}s")
            
            # Aggregate response structure
            response = OrchestratorResponse(
                request_id=context.request_id,
                workflow_id=workflow_id,
                status=OrchestratorState.COMPLETED,
                selected_agent=agent.__class__.__name__,
                execution_time=execution_time,
                result=agent_response.result,
                warnings=agent_response.warnings,
                errors=agent_response.errors,
                metadata=agent_response.metadata,
                trace_id=agent_response.trace_id
            )
            
            event_bus.publish("WorkflowCompleted", {"workflow_id": workflow_id, "response": response})
            return response

        except Exception as e:
            execution_time = time.time() - start_time
            logger.exception(f"Workflow: Failed during execution due to error: {e}")
            event_bus.publish("WorkflowFailed", {"workflow_id": workflow_id, "error": str(e)})
            
            response = OrchestratorResponse(
                request_id=context.request_id,
                workflow_id=workflow_id,
                status=OrchestratorState.FAILED,
                selected_agent=agent.__class__.__name__ if agent else "UnknownAgent",
                execution_time=execution_time,
                result={},
                warnings=[],
                errors=[str(e)],
                metadata={},
                trace_id=uuid.uuid4()
            )
            
            return response
