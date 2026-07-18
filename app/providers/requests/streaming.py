from typing import AsyncIterator, Dict, Any

class StreamingInterface:
    """
    Abstract placeholder interface for future SSE streaming implementation hooks.
    """
    async def get_stream_iterator(self) -> AsyncIterator[Dict[str, Any]]:
        """
        Yields message chunks sequentially as they arrive.
        """
        # Mock generator placeholder
        yield {"chunk": "initialized"}
