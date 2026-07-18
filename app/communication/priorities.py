from typing import List
from app.communication.messages import AgentMessage, MessagePriority
from loguru import logger

class MessagePrioritySorter:
    """
    Sorts/re-orders message buffers to prioritize CRITICAL and HIGH priorities.
    """
    def prioritize_queue(self, queue: List[AgentMessage]) -> List[AgentMessage]:
        logger.debug(f"PrioritySorter: Sorting queue buffer of size {len(queue)}...")
        
        # Priority mapping values
        val_map = {
            MessagePriority.CRITICAL: 4,
            MessagePriority.HIGH: 3,
            MessagePriority.MEDIUM: 2,
            MessagePriority.LOW: 1
        }
        
        # Sort descending by priority mapping value
        queue.sort(key=lambda m: val_map.get(m.priority, 0), reverse=True)
        return queue
