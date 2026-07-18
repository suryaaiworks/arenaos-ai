from typing import Any, List
from app.memory.compression import HistoryCompressorInterface
from loguru import logger

class MockSummarizer(HistoryCompressorInterface):
    """
    Mock implementation of history compression mapping.
    Replaces long conversation turns lists with summarized text log tags.
    """
    async def compress_history(self, history: List[Any]) -> List[Any]:
        logger.info(f"MockSummarizer: Compressing conversation turns list (count: {len(history)})...")
        if len(history) <= 2:
            return history

        # Keep the system instruction and final turn, compress the rest into a metadata recap turn
        summary_text = f"[SUMMARY RECAP: Combined {len(history) - 2} intermediate conversation turns here.]"
        
        compressed = [
            history[0],  # System prompt/first instruction turn
            {"role": "system", "content": summary_text},
            history[-1]  # Final turn
        ]
        
        logger.info("MockSummarizer: History compression resolved successfully.")
        return compressed
