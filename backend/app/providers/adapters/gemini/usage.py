from app.providers.requests.usage import TokenUsage
from loguru import logger

class GeminiUsageCalculator:
    """
    Calculates execution usage costs based on model type input/output token metrics.
    """
    def build_usage_metrics(
        self,
        model_name: str,
        input_tokens: int,
        output_tokens: int,
        latency: float
    ) -> TokenUsage:
        logger.debug("GeminiUsage: Accumulating total token usage metrics...")
        
        # Approximate Gemini pricing slots per 1M tokens:
        # gemini-1.5-flash: $0.075 / 1M input, $0.30 / 1M output
        # gemini-1.5-pro: $1.25 / 1M input, $5.00 / 1M output
        
        input_rate = 0.075 / 1_000_000
        output_rate = 0.30 / 1_000_000
        
        if "pro" in model_name.lower():
            input_rate = 1.25 / 1_000_000
            output_rate = 5.00 / 1_000_000

        cost = (input_tokens * input_rate) + (output_tokens * output_rate)
        
        return TokenUsage(
            input_tokens=input_tokens,
            output_tokens=output_tokens,
            total_tokens=input_tokens + output_tokens,
            estimated_cost=round(cost, 6),
            latency_seconds=latency,
            provider_name="gemini",
            model_name=model_name
        )
