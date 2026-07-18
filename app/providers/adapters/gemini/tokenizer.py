from google import genai
from loguru import logger

class GeminiTokenizer:
    """
    Helps count token allocations for models prompts using client.aio.models.count_tokens.
    """
    def __init__(self, client: genai.Client):
        self.client = client

    async def count_tokens(self, model: str, contents: str) -> int:
        try:
            logger.debug(f"GeminiTokenizer: Requesting tokens count for '{model}'...")
            res = await self.client.aio.models.count_tokens(
                model=model,
                contents=contents
            )
            return getattr(res, "total_tokens", 0)
        except Exception as e:
            logger.warning(f"GeminiTokenizer: Failed to query token counts: {e}")
            # Standard safe character heuristic fallback (approx. 4 chars per token)
            return len(contents) // 4
