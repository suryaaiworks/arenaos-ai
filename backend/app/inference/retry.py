from typing import Any, Callable, Dict, List
from app.inference.policies import RetryPolicy
from app.inference.exceptions import RetryExceeded
from loguru import logger
import asyncio

class RetryStrategy:
    """
    Decoupled Retry Strategy interface.
    Handles retry policies loops, timeouts, rate limits, and provider switching.
    """
    async def execute_with_retry(
        self,
        func: Callable,
        args: tuple = (),
        kwargs: dict = None,
        policy: RetryPolicy = None
    ) -> Any:
        """
        Runs async function wrapped in retry policy loops.
        """
        kwargs = kwargs or {}
        policy = policy or RetryPolicy()
        
        attempts = 0
        backoff = 1.0

        while attempts < policy.max_attempts:
            try:
                attempts += 1
                logger.debug(f"RetryStrategy: Attempt {attempts}/{policy.max_attempts}...")
                return await func(*args, **kwargs)
            except Exception as e:
                logger.warning(f"RetryStrategy: Attempt {attempts} failed with error: {e}")
                if attempts >= policy.max_attempts:
                    logger.error("RetryStrategy: Max retries exceeded.")
                    raise RetryExceeded(f"Execution failed after {attempts} attempts: {e}")
                
                # Apply exponential backoff delay
                delay = backoff * policy.backoff_factor
                logger.debug(f"RetryStrategy: Waiting {delay:.2f}s before next retry...")
                await asyncio.sleep(delay)
                backoff = delay
