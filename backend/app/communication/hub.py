import time
from typing import List, Optional
from app.communication.registry import SubscriptionRegistry
from app.communication.router import MessageRouter
from app.communication.dispatcher import MessageDispatcher
from app.communication.validator import MessageValidator
from app.communication.acknowledgements import DeliveryTracker
from app.communication.dead_letter import DeadLetterQueue
from app.communication.events import EventSystem
from app.communication.messages import AgentMessage, MessageType
from app.communication.metrics import comm_metrics
from loguru import logger

class CommunicationHub:
    """
    Central mediator hub governing inter-agent routing, broadcasts distribution,
    event publisher-subscriber channels, and delivery logs audits.
    """
    def __init__(self):
        self.registry = SubscriptionRegistry()
        self.tracker = DeliveryTracker()
        self.dlq = DeadLetterQueue()
        
        self.validator = MessageValidator()
        self.router = MessageRouter(self.registry)
        self.dispatcher = MessageDispatcher(self.registry, self.tracker, self.dlq)
        self.event_broker = EventSystem()

    async def send_message(self, msg: AgentMessage) -> bool:
        """
        Validates, routes, and dispatches the inter-agent message packet.
        """
        logger.info(f"CommHub: Directing message '{msg.message_id}' from '{msg.sender}' to '{msg.receiver}'...")
        start_time = time.time()
        
        try:
            # 1. Validate msg packet
            self.validator.validate_message(msg)
            self.tracker.record_transition(msg.message_id, "queued")
            self.event_broker.publish("MessageSent", msg)

            # 2. Resolve destination list
            receivers = self.router.resolve_destination_receivers(msg)
            
            # 3. Dispatch to target queues
            success = await self.dispatcher.dispatch_message(msg, receivers)

            latency = time.time() - start_time
            if success:
                comm_metrics.record_sent()
                comm_metrics.record_received(latency)
                self.event_broker.publish("MessageDelivered", msg)
                logger.info(f"CommHub: Message '{msg.message_id}' routed successfully in {latency:.4f}s")
            else:
                comm_metrics.record_failure()
                self.event_broker.publish("DeadLetterCreated", msg)
                
            return success

        except Exception as e:
            logger.exception(f"CommHub: Failed to route message: {e}")
            comm_metrics.record_failure()
            self.dlq.quarantine(msg, f"Routing exception: {str(e)}")
            self.tracker.record_transition(msg.message_id, "failed")
            self.event_broker.publish("DeadLetterCreated", msg)
            return False

    async def broadcast_message(self, msg: AgentMessage) -> bool:
        logger.info(f"CommHub: Initiating broadcast channel feed from '{msg.sender}'...")
        msg.message_type = MessageType.BROADCAST
        comm_metrics.record_broadcast()
        return await self.send_message(msg)


# Instantiate CommunicationHub singleton
communication_hub = CommunicationHub()
