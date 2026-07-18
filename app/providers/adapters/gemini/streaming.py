from typing import AsyncGenerator
from google.genai import types
from loguru import logger

class GeminiStreamAdapter:
    """
    Translates raw asynchronous stream chunks returned by the Gemini SDK.
    """
    async def adapt_stream(self, stream_iterator: Any) -> AsyncGenerator[dict, None]:
        logger.debug("GeminiStream: Listening for streaming chunks...")
        try:
            async for chunk in stream_iterator:
                text = getattr(chunk, "text", "")
                yield {
                    "text": text,
                    "finish_reason": getattr(chunk, "candidates", [None])[0].finish_reason if getattr(chunk, "candidates", []) else None,
                    "metadata": {}
                }
        except Exception as e:
            logger.error(f"GeminiStream: Error encountered during stream read: {e}")
            raise e
from typing import Any
