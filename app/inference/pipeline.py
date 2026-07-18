import time
from typing import Any, Dict, List
from app.inference.prompt_builder import PromptBuilder
from app.inference.context_builder import ContextBuilder
from app.inference.memory_builder import MemoryBuilder
from app.inference.tool_selector import ToolSelector
from app.inference.model_selector import ModelSelector
from app.inference.response_validator import ResponseValidator
from app.inference.retry import RetryStrategy
from app.inference.policies import InferencePolicies
from app.providers.manager.provider_manager import provider_manager
from app.providers.requests.request import ProviderRequest
from app.providers.requests.response import ProviderResponse
from app.inference.metrics import inference_metrics
from loguru import logger

class InferencePipeline:
    """
    Coordinates prompt compilation, contexts aggregation, selector parameters,
    provider execution, and validation checks.
    """
    def __init__(self):
        self.prompt_builder = PromptBuilder()
        self.context_builder = ContextBuilder()
        self.memory_builder = MemoryBuilder()
        self.tool_selector = ToolSelector()
        self.model_selector = ModelSelector()
        self.response_validator = ResponseValidator()
        self.retry_strategy = RetryStrategy()

    async def execute(
        self,
        user_prompt: str,
        system_prompt: str = None,
        developer_prompt: str = None,
        context: Dict[str, Any] = None,
        short_mem: Dict[str, Any] = None,
        long_mem: Dict[str, Any] = None,
        session_mem: Dict[str, Any] = None,
        history: List[Dict[str, Any]] = None,
        capabilities_required: List[str] = None,
        policies: InferencePolicies = None
    ) -> ProviderResponse:
        """
        Runs the full inference pipeline flow.
        """
        start_time = time.time()
        policies = policies or InferencePolicies()
        logger.info("InferencePipeline: Initiating prompt compilation flow...")

        # 1. Merge Contexts
        logger.debug("InferencePipeline: Merging runtime context keys...")
        merged_context = self.context_builder.build_merged_context(
            arenamind_ctx=context
        )

        # 2. Format memories
        logger.debug("InferencePipeline: Formatting memory registers...")
        memory_str = self.memory_builder.format_memories_to_prompt(
            short_mem=short_mem,
            long_mem=long_mem,
            session_mem=session_mem,
            history=history
        )
        if memory_str:
            merged_context["memories_context"] = memory_str

        # 3. Choose provider and model name based on ModelPolicy
        provider_name, model_name = self.model_selector.choose_model_and_provider(policies.model)

        # 4. Map candidate tools manifests
        logger.debug("InferencePipeline: Mapping candidate tools...")
        tools = self.tool_selector.select_candidate_tools(capabilities_required or [])

        # 5. Assemble Prompt strings
        logger.debug("InferencePipeline: Building prompts segments...")
        sys_str = self.prompt_builder.build_system_prompt(system_prompt, developer_prompt)
        user_str = self.prompt_builder.build_user_prompt(
            user_prompt=user_prompt,
            context=merged_context
        )

        # 6. Build ProviderRequest schema
        req = ProviderRequest(
            user_prompt=user_str,
            system_prompt=sys_str,
            context=merged_context,
            tools=tools,
            temperature=0.7,
            metadata={"model": model_name}
        )

        # 7. Execute generation using ProviderManager with retries
        logger.info(f"InferencePipeline: Dispatching request to provider manager (using active: '{provider_name}')...")
        
        # Capture current active provider name, switch temporarily if different
        original_active = provider_manager.get_active_provider_name()
        if original_active != provider_name:
            provider_manager.select_provider(provider_name)

        async def run_call():
            return await provider_manager.generate_response(req)

        try:
            response = await self.retry_strategy.execute_with_retry(
                func=run_call,
                policy=policies.retry
            )

            # Restore original active provider selection context if changed
            if original_active != provider_name:
                provider_manager.select_provider(original_active)

            # 8. Validate Response outputs
            logger.debug("InferencePipeline: Running output validation constraints...")
            self.response_validator.validate_response(response)

            duration = time.time() - start_time
            # Record execution metrics
            inference_metrics.record_run(
                provider=provider_name,
                model=model_name,
                duration=duration,
                success=True,
                retries=0,
                tools_called=[tc.get("name", "") for tc in response.tool_calls]
            )

            return response

        except Exception as e:
            # Restore original active provider if error
            if original_active != provider_name:
                provider_manager.select_provider(original_active)
                
            duration = time.time() - start_time
            inference_metrics.record_run(
                provider=provider_name,
                model=model_name,
                duration=duration,
                success=False,
                retries=0,
                tools_called=[]
            )
            logger.error(f"InferencePipeline: Execution failed: {e}")
            raise e
