import time
from typing import Any, Dict
from app.orchestrator.validator import RequestValidator
from app.orchestrator.classifier import RequestClassifier
from app.orchestrator.registry import agent_registry, AgentRegistry
from app.orchestrator.workflow import WorkflowEngine
from app.orchestrator.context import OrchestratorContext
from app.orchestrator.response import OrchestratorResponse
from app.orchestrator.state import OrchestratorState
from app.orchestrator.metrics import metrics_tracker
from app.orchestrator.exceptions import InvalidRequest
from loguru import logger

class ExecutionPipeline:
    """
    Execution Pipeline class.
    Coordinates validation, classification, context, selection, workflow execution,
    metrics recording, and response aggregation.
    Every step is decoupled and independently replaceable.
    """
    def __init__(
        self,
        validator: RequestValidator = None,
        classifier: RequestClassifier = None,
        registry: AgentRegistry = None,
        workflow_engine: WorkflowEngine = None
    ):
        self.validator = validator or RequestValidator()
        self.classifier = classifier or RequestClassifier()
        self.registry = registry or agent_registry
        self.workflow_engine = workflow_engine or WorkflowEngine()

    async def run(self, payload: Dict[str, Any]) -> OrchestratorResponse:
        """
        Runs the full execution pipeline flow sequentially.
        """
        logger.info("Pipeline: Inbound request execution flow initiated.")
        
        # Step 1: Validate payload
        logger.debug("Pipeline Step 1: Validation started...")
        errors = self.validator.validate_request(payload)
        if errors:
            logger.error(f"Pipeline Step 1: Validation failed: {errors}")
            raise InvalidRequest(f"Validation checks failed: {'; '.join(errors)}")
        logger.debug("Pipeline Step 1: Validation completed successfully.")

        # Step 2: Classify request
        logger.debug("Pipeline Step 2: Request classification started...")
        raw_type = payload["request_type"]
        normalized_category = self.classifier.classify_and_normalize(raw_type)
        logger.info(f"Pipeline Step 2: Classification normalized: '{normalized_category}'")

        # Step 3: Build Context
        logger.debug("Pipeline Step 3: Context building started...")
        context = OrchestratorContext(
            priority=payload.get("priority", "medium"),
            metadata=payload.get("metadata", {}),
            request_source=payload.get("request_source", "api"),
            language=payload.get("language", "en")
        )
        logger.debug(f"Pipeline Step 3: Context initialized | Request ID: {context.request_id}")

        # Step 4: Dispatch (Select Agent)
        logger.debug("Pipeline Step 4: Agent selection/dispatch started...")
        agent = self.registry.get_agent(normalized_category)
        logger.info(f"Pipeline Step 4: Dispatcher selected agent class: '{agent.__class__.__name__}'")

        # Step 5: Execute Workflow
        logger.debug("Pipeline Step 5: Workflow execution started...")
        response = await self.workflow_engine.execute_workflow(context, agent)
        logger.info(f"Pipeline Step 5: Workflow execution resolved with status '{response.status}'")

        # Step 6: Record execution metrics
        success = response.status == OrchestratorState.COMPLETED
        metrics_tracker.record_execution(
            agent_name=agent.__class__.__name__, 
            duration=response.execution_time, 
            success=success
        )

        return response
