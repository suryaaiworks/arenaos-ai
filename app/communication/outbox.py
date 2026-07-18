from typing import List
from app.communication.messages import AgentMessage
from loguru import logger

class AgentOutbox:
    """
    Outbox buffer managing messages queued to be dispatched from an Agent.
    """
    def __init__(self, agent_id: str):
        self.agent_id = agent_id
        self.outbox: List[AgentMessage] = []
        self.sent: List[AgentMessage] = []

    def queue_message(self, msg: AgentMessage) -> None:
        logger.debug(f"Outbox [{self.agent_id}]: Message '{msg.message_id}' staged for delivery.")
        msg.status = "queued"
        self.outbox.append(msg)

    def mark_sent(self, msg_id: str) -> None:
        for idx, m in enumerate(self.outbox):
            if str(m.message_id) == str(msg_id):
                m.status = "delivered"
                self.outbox.pop(idx)
                self.sent.append(m)
                logger.debug(f"Outbox [{self.agent_id}]: Message '{msg_id}' marked dispatched.")
                return
