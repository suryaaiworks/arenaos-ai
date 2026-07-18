import time
from typing import List
from app.communication.messages import AgentMessage
from app.communication.registry import SubscriptionRegistry
from app.communication.acknowledgements import DeliveryTracker
from app.communication.dead_letter import DeadLetterQueue
from loguru import logger

class MessageDispatcher:
    """
    Dispatches routed messages to target inboxes and outboxes.
    Quarantines expired messages to the Dead Letter Queue.
    """
    def __init__(
        self,
        registry: SubscriptionRegistry,
        tracker: DeliveryTracker,
        dlq: DeadLetterQueue
    ):
        self.registry = registry
        self.tracker = tracker
        self.dlq = dlq

    async def dispatch_message(self, msg: AgentMessage, receivers: List[str]) -> bool:
        logger.info(f"Dispatcher: Dispatching message '{msg.message_id}' to receivers {receivers}...")
        
        # Check TTL expiration
        from datetime import datetime
        msg_age = (datetime.utcnow() - msg.timestamp).total_seconds()
        if msg_age > msg.ttl:
            logger.warning(f"Dispatcher: Message expired (Age: {msg_age:.2f}s | TTL: {msg.ttl}s)")
            self.dlq.quarantine(msg, f"Message expired: Age {msg_age:.2f}s exceeded TTL {msg.ttl}s")
            self.tracker.record_transition(msg.message_id, "expired")
            return False

        if not receivers:
            logger.warning(f"Dispatcher: No target receivers resolved for message '{msg.message_id}'")
            self.dlq.quarantine(msg, "No receivers resolved")
            self.tracker.record_transition(msg.message_id, "failed")
            return False

        # Queue in sender outbox
        sender_outbox = self.registry.get_or_create_outbox(msg.sender)
        sender_outbox.queue_message(msg)

        # Dispatch to each receiver inbox
        success = False
        for receiver in receivers:
            try:
                receiver_inbox = self.registry.get_or_create_inbox(receiver)
                receiver_inbox.receive(msg)
                
                # Update status logs
                self.tracker.record_transition(msg.message_id, "received")
                success = True
            except Exception as e:
                logger.error(f"Dispatcher: Delivery to '{receiver}' failed: {e}")
                self.tracker.record_transition(msg.message_id, f"failed_delivery_to_{receiver}")

        if success:
            sender_outbox.mark_sent(msg.message_id)
            self.tracker.record_transition(msg.message_id, "delivered")
            
        return success
