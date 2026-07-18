from typing import Any, Dict, List
from app.communication.messages import AgentMessage
from loguru import logger

class DeadLetterQueue:
    """
    Quarantines expired, undeliverable, or failed message packets for audit inspection.
    """
    def __init__(self):
        self._quarantined: List[AgentMessage] = []

    def quarantine(self, msg: AgentMessage, reason: str) -> None:
        logger.warning(f"DLQ: Quarantining message '{msg.message_id}' | Reason: '{reason}'")
        msg.status = "dead_lettered"
        
        # Inject reason into metadata
        msg.metadata["dlq_reason"] = reason
        self._quarantined.append(msg)

    def list_quarantined(self) -> List[AgentMessage]:
        return self._quarantined

    def retrieve_by_correlation_id(self, corr_id: str) -> List[AgentMessage]:
        return [m for m in self._quarantined if str(m.correlation_id) == str(corr_id)]
