import uuid
from typing import Any, Dict, List
from google.genai import types
from app.providers.requests.request import ProviderRequest
from app.providers.requests.response import ProviderResponse
from app.providers.adapters.gemini.config import GeminiProviderConfiguration
from app.providers.adapters.gemini.safety import GeminiSafetyConfigurator
from app.providers.adapters.gemini.function_calling import GeminiFunctionCallingBinder
from app.providers.adapters.gemini.usage import GeminiUsageCalculator
from loguru import logger

class GeminiRequestResponseMapper:
    """
    Decoupled request mapping.
    Maps internal ProviderRequest payload parameters to GenAI SDK configuration schemas.
    """
    def __init__(self, config: GeminiProviderConfiguration):
        self.config = config
        self.safety_configurator = GeminiSafetyConfigurator()
        self.fc_binder = GeminiFunctionCallingBinder()
        self.usage_calculator = GeminiUsageCalculator()

    def build_contents_payload(self, request: ProviderRequest) -> List[types.Content]:
        logger.debug("GeminiMapper: Mapping conversations turns history...")
        contents = []

        # Contextual memories inject
        history = request.context.get("history", [])
        for turn in history:
            role = turn.get("role", "user")
            content_str = turn.get("content", "")
            contents.append(
                types.Content(
                    role="user" if role == "user" else "model",
                    parts=[types.Part.from_text(text=content_str)]
                )
            )

        # Append main prompt content
        contents.append(
            types.Content(
                role="user",
                parts=[types.Part.from_text(text=request.user_prompt)]
            )
        )
        return contents

    def build_generation_config(self, request: ProviderRequest) -> types.GenerateContentConfig:
        logger.debug("GeminiMapper: Mapping settings configurations and active tool declarations...")
        
        # Build tool definitions list if requested
        tools = []
        if request.tools:
            # Map tools from registry matching
            decl_list = []
            for t_manifest in request.tools:
                # Convert Dict back to ToolManifest model
                from app.toolkit.base.manifest import ToolManifest
                manifest = ToolManifest(**t_manifest)
                decl = self.fc_binder.convert_manifest_to_declaration(manifest)
                decl_list.append(decl)
                
            if decl_list:
                tools.append(types.Tool(function_declarations=decl_list))

        safety = self.safety_configurator.build_safety_settings()

        return types.GenerateContentConfig(
            system_instruction=request.system_prompt or "You are an ArenaOS smart stadium coordinator.",
            temperature=request.temperature or self.config.temperature,
            max_output_tokens=self.config.max_output_tokens,
            top_p=self.config.top_p,
            top_k=self.config.top_k,
            tools=tools or None,
            safety_settings=safety
        )

    def parse_gemini_response(
        self,
        gemini_response: Any,
        model_name: str,
        latency: float,
        input_tokens: int = 0
    ) -> ProviderResponse:
        logger.debug("GeminiMapper: Mapping SDK responseCandidate into ProviderResponse...")
        
        text = ""
        tool_calls = []
        finish_reason = "stop"
        
        # Retrieve candidates
        candidates = getattr(gemini_response, "candidates", [])
        if candidates:
            cand = candidates[0]
            finish_reason = str(getattr(cand, "finish_reason", "stop")).lower()
            
            # Parse text
            parts = getattr(getattr(cand, "content", None), "parts", [])
            for part in parts:
                part_text = getattr(part, "text", "")
                if part_text:
                    text += part_text
                
                # Check for function call request candidates
                f_call = getattr(part, "function_call", None)
                if f_call:
                    name = getattr(f_call, "name", "")
                    args = getattr(f_call, "args", {})
                    # Standardize arguments dict format
                    args_dict = dict(args) if args else {}
                    tool_calls.append({
                        "name": name,
                        "args": args_dict
                    })

        # Token usage extraction
        usage_metadata = getattr(gemini_response, "usage_metadata", None)
        in_tokens = getattr(usage_metadata, "prompt_token_count", input_tokens) if usage_metadata else input_tokens
        out_tokens = getattr(usage_metadata, "candidates_token_count", 0) if usage_metadata else 0
        
        usage = self.usage_calculator.build_usage_metrics(
            model_name=model_name,
            input_tokens=in_tokens,
            output_tokens=out_tokens,
            latency=latency
        )

        return ProviderResponse(
            response_id=uuid.uuid4(),
            provider="gemini",
            model=model_name,
            text=text,
            tool_calls=tool_calls,
            usage=usage,
            latency=latency,
            finish_reason=finish_reason,
            metadata={"safety_ratings": []}
        )
