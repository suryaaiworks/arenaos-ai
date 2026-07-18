from typing import List
from app.communication.messages import AgentMessage, MessageType
from app.communication.registry import SubscriptionRegistry
from loguru import logger

class MessageRouter:
    """
    Decoupled routing strategies resolver.
    Directs messages to inboxes based on direct keys, capabilities, or topics.
    """
    def __init__(self, registry: SubscriptionRegistry):
        self.registry = registry

    def resolve_destination_receivers(self, msg: AgentMessage) -> List[str]:
        logger.debug(f"Router: Resolving destinations for message '{msg.message_id}'...")
        receivers = []

        # 1. Broadcast Routing
        if msg.message_type == MessageType.BROADCAST or msg.receiver.lower() == "broadcast":
            logger.debug("Router: Mapping broadcast targets across all registered inboxes...")
            # Route to all agent inboxes currently active in registry
            return list(self.registry._inboxes.keys())

        # 2. Topic/Channel Routing
        # Check if receiver matches active channel names or subscription topics
        channel_keys = [c.name.value for c in self.registry.list_channels()]
        if msg.receiver.lower() in channel_keys:
            topic_name = msg.receiver.lower()
            logger.debug(f"Router: Fetching subscribers registered to channel topic '{topic_name}'...")
            receivers.extend(self.registry.get_subscribers_for_topic(topic_name))
        else:
            # 3. Direct Key Routing
            logger.debug(f"Router: Mapping direct routing target to '{msg.receiver}'...")
            receivers.append(msg.receiver)

        return list(set(receivers))
