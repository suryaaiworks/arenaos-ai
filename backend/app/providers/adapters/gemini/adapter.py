import time
from typing import AsyncGenerator, List
from google.genai import types
from app.providers.base.provider import BaseModelProvider
from app.providers.requests.request import ProviderRequest
from app.providers.requests.response import ProviderResponse
from app.providers.adapters.gemini.config import GeminiProviderConfiguration
from app.providers.adapters.gemini.client import GeminiClient
from app.providers.adapters.gemini.mapper import GeminiRequestResponseMapper
from app.providers.adapters.gemini.health import GeminiHealthChecker
from app.providers.adapters.gemini.streaming import GeminiStreamAdapter
from app.providers.adapters.gemini.tokenizer import GeminiTokenizer
from loguru import logger

class GeminiProviderAdapter(BaseModelProvider):
    """
    Vendor-independent Google Gemini SDK adapter.
    Exposes content generation, streaming, native function calling, and health audits.
    """
    def __init__(self, config: GeminiProviderConfiguration):
        super().__init__(config)
        self.config: GeminiProviderConfiguration = config
        self.client: GeminiClient = None
        self.mapper: GeminiRequestResponseMapper = None
        self.health_checker: GeminiHealthChecker = None
        self.stream_adapter = GeminiStreamAdapter()
        self._tokenizer = None

    async def initialize(self) -> None:
        logger.info("GeminiProvider: Parsing configurations environment...")
        self.client = GeminiClient(self.config)
        self.mapper = GeminiRequestResponseMapper(self.config)
        self.health_checker = GeminiHealthChecker(self.client)
        self._tokenizer = GeminiTokenizer(self.client.raw_client) if self.client.has_credentials() else None
        logger.info("GeminiProvider: Adapter setup completed.")

    async def health(self) -> dict:
        if not self.health_checker:
            return {"provider": "gemini", "status": "uninitialized"}
        return await self.health_checker.verify_health()

    async def generate(self, request: ProviderRequest) -> ProviderResponse:
        logger.info("GeminiProvider: Generating content response...")
        start_time = time.time()
        
        # Check API key configuration credentials
        if not self.client.has_credentials():
            raise ValueError("Gemini API key is unconfigured. Cannot complete generation.")
            
        model_name = request.metadata.get("model", self.config.model)
        
        try:
            # 1. Build contents turns
            contents = self.mapper.build_contents_payload(request)
            
            # 2. Build Generation Config
            config = self.mapper.build_generation_config(request)
            
            # 3. Call generate content
            logger.debug(f"GeminiProvider: Dispatching async SDK call using model '{model_name}'...")
            res = await self.client.raw_client.aio.models.generate_content(
                model=model_name,
                contents=contents,
                config=config
            )
            
            # 4. Check for Native Function Calling execution
            tool_calls = []
            candidates = getattr(res, "candidates", [])
            if candidates:
                parts = getattr(candidates[0].content, "parts", [])
                for part in parts:
                    f_call = getattr(part, "function_call", None)
                    if f_call:
                        tool_calls.append(f_call)

            if tool_calls:
                logger.info(f"GeminiProvider: Native function calling triggered: {len(tool_calls)} calls requested.")
                
                # Append model content turn containing function_call
                contents.append(candidates[0].content)
                
                # Execute tools locally and append function responses
                resp_parts = []
                for call in tool_calls:
                    name = call.name
                    args = dict(call.args) if call.args else {}
                    
                    # Execute
                    out = await self.mapper.fc_binder.execute_tool_call(name, args)
                    
                    resp_parts.append(
                        types.Part.from_function_response(
                            name=name,
                            response={"result": out}
                        )
                    )
                    
                contents.append(
                    types.Content(
                        role="tool",
                        parts=resp_parts
                    )
                )
                
                # Call second time
                logger.debug("GeminiProvider: Sending function execution outcomes back to model...")
                res = await self.client.raw_client.aio.models.generate_content(
                    model=model_name,
                    contents=contents,
                    config=config
                )

            latency = time.time() - start_time
            
            # 5. Map response back to ProviderResponse
            return self.mapper.parse_gemini_response(
                gemini_response=res,
                model_name=model_name,
                latency=latency
            )

        except Exception as e:
            translated = self.client.translator.translate_exception(e)
            logger.error(f"GeminiProvider: SDK execution failed: {translated}")
            raise translated

    async def stream(self, request: ProviderRequest) -> AsyncGenerator[dict, None]:
        logger.info("GeminiProvider: Initiating stream generation...")
        
        if not self.client.has_credentials():
            raise ValueError("Gemini API key is unconfigured. Cannot stream.")
            
        model_name = request.metadata.get("model", self.config.model)
        
        try:
            contents = self.mapper.build_contents_payload(request)
            config = self.mapper.build_generation_config(request)
            
            # Call generate_content_stream
            stream = await self.client.raw_client.aio.models.generate_content_stream(
                model=model_name,
                contents=contents,
                config=config
            )
            
            # Yield chunks using stream adapter generator
            async for chunk in self.stream_adapter.adapt_stream(stream):
                yield chunk

        except Exception as e:
            translated = self.client.translator.translate_exception(e)
            logger.error(f"GeminiProvider: Stream iteration failed: {translated}")
            raise translated

    async def embed(self, texts: List[str]) -> List[List[float]]:
        # Mock empty embeddings dimensions
        return [[0.1, 0.2, 0.3] for _ in texts]

    async def count_tokens(self, text: str) -> int:
        if self._tokenizer:
            return await self._tokenizer.count_tokens(self.config.model, text)
        return len(text) // 4 + 1

    async def validate_request(self, request: ProviderRequest) -> bool:
        return len(request.user_prompt) > 0

    async def cleanup(self) -> None:
        logger.info("GeminiProvider: Cleaned up active client resources.")

    async def metadata(self) -> dict:
        return {
            "name": "GeminiProviderAdapter",
            "provider": "gemini",
            "supported_models": [self.config.model]
        }
