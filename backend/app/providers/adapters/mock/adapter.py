import time
import uuid
from typing import Any, List
from app.providers.base.provider import BaseModelProvider
from app.providers.requests.request import ProviderRequest
from app.providers.requests.response import ProviderResponse
from app.providers.requests.usage import TokenUsage
from app.providers.base.config import ProviderConfiguration
from loguru import logger

class MockProvider(BaseModelProvider):
    """
    Mock AI Provider returning static predictable generated text for offline diagnostics tests.
    """
    def __init__(self, config: ProviderConfiguration = None):
        super().__init__(config or ProviderConfiguration())
        self._initialized = False

    async def initialize(self) -> None:
        self._initialized = True
        logger.info("MockProvider: Initialized offline environment successfully.")

    async def health(self) -> dict:
        return {"status": "healthy", "provider": "mock", "offline": True}

    async def generate(self, request: ProviderRequest) -> ProviderResponse:
        logger.info(f"MockProvider: Running execution generate trace for ID {request.request_id}...")
        start_time = time.time()
        
        # Predictable response based on user input length
        text_len = len(request.user_prompt)
        text_out = (
            f"[MOCK RESPONSE] Received prompt: '{request.user_prompt}'. "
            f"Orchestration workflow resolved cleanly. Context count is {len(request.context)}."
        )
        
        latency = time.time() - start_time
        
        # Calculate predictable token counts
        in_tokens = text_len // 4 + 5
        out_tokens = len(text_out) // 4 + 5
        total_tokens = in_tokens + out_tokens
        
        usage = TokenUsage(
            input_tokens=in_tokens,
            output_tokens=out_tokens,
            total_tokens=total_tokens,
            estimated_cost=round(total_tokens * 0.000002, 6),
            latency_seconds=latency,
            provider_name="mock",
            model_name="mock-model"
        )
        
        return ProviderResponse(
            response_id=uuid.uuid4(),
            provider="mock",
            model="mock-model",
            text=text_out,
            tool_calls=[],
            usage=usage,
            latency=latency,
            finish_reason="stop",
            metadata={"test_mode": True}
        )

    async def stream(self, request: ProviderRequest) -> Any:
        logger.debug("MockProvider: Streaming mock generator initialized.")
        return None

    async def embed(self, texts: List[str]) -> List[List[float]]:
        # Mock empty embeddings dimensions
        return [[0.1, 0.2, 0.3] for _ in texts]

    async def count_tokens(self, text: str) -> int:
        return len(text) // 4 + 1

    async def validate_request(self, request: ProviderRequest) -> bool:
        return len(request.user_prompt) > 0

    async def cleanup(self) -> None:
        logger.info("MockProvider: Freed test connections.")

    async def metadata(self) -> dict:
        return {
            "name": "MockProvider",
            "provider": "mock",
            "supported_models": ["mock-model"]
        }
