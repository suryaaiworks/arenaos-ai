from typing import List
from app.communication.messages import AgentMessage
from loguru import logger

class AgentInbox:
    """
    Structured Inbox managing received messages queue buffers for an Agent.
    """
    def __init__(self, agent_id: str):
        self.agent_id = agent_id
        self.inbox: List[AgentMessage] = []
        self.pending: List[AgentMessage] = []
        self.completed: List[AgentMessage] = []
        self.failed: List[AgentMessage] = []

    def receive(self, msg: AgentMessage) -> None:
        logger.debug(f"Inbox [{self.agent_id}]: Message '{msg.message_id}' queued in inbox.")
        msg.status = "delivered"
        self.inbox.append(msg)

    def next_pending(self) -> AgentMessage:
        if not self.inbox:
            raise IndexError("Inbox queue is empty.")
        msg = self.inbox.pop(0)
        msg.status = "processing"
        self.pending.append(msg)
        return msg

    def mark_completed(self, msg_id: str) -> None:
        for idx, m in enumerate(self.pending):
            if str(m.message_id) == str(msg_id):
                m.status = "completed"
                self.pending.pop(idx)
                self.completed.append(m)
                logger.debug(f"Inbox [{self.agent_id}]: Message '{msg_id}' marked completed.")
                return

    def mark_failed(self, msg_id: str) -> None:
        for idx, m in enumerate(self.pending):
            if str(m.message_id) == str(msg_id):
                m.status = "failed"
                self.pending.pop(idx)
                self.failed.append(m)
                logger.debug(f"Inbox [{self.agent_id}]: Message '{msg_id}' marked failed.")
                return
