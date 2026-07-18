from typing import Any, Callable
from loguru import logger

class RetryInterface:
    """
    Interface policy definition for retry operations.
    """
    async def retry_execution(self, func: Callable, *args, **kwargs) -> Any:
        pass


class FixedDelayRetry(RetryInterface):
    """
    Simple mock implementation of fixed delay retry strategy.
    """
    def __init__(self, max_attempts: int = 3, delay_seconds: float = 1.0):
        self.max_attempts = max_attempts
        self.delay_seconds = delay_seconds

    async def retry_execution(self, func: Callable, *args, **kwargs) -> Any:
        attempts = 0
        while attempts < self.max_attempts:
            try:
                attempts += 1
                logger.debug(f"FixedDelayRetry: Executing attempt {attempts}/{self.max_attempts}...")
                return await func(*args, **kwargs)
            except Exception as e:
                logger.warning(f"FixedDelayRetry: Attempt {attempts} failed with error: {e}")
                if attempts >= self.max_attempts:
                    raise e
                import asyncio
                await asyncio.sleep(self.delay_seconds)
