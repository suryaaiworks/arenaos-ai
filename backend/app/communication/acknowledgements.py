from datetime import datetime
from typing import Dict, List
from loguru import logger

class DeliveryTracker:
    """
    Traces and logs acknowledgements status transitions for agent message packets.
    """
    def __init__(self):
        self._statuses: Dict[str, List[dict]] = {}

    def record_transition(self, msg_id: str, status: str) -> None:
        key = str(msg_id)
        if key not in self._statuses:
            self._statuses[key] = []
            
        transition = {
            "status": status,
            "timestamp": datetime.utcnow()
        }
        self._statuses[key].append(transition)
        logger.debug(f"DeliveryTracker: Message '{msg_id}' state transitioned to '{status}'")

    def get_history(self, msg_id: str) -> List[dict]:
        return self._statuses.get(str(msg_id), [])
