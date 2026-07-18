from typing import Dict, List
from app.communication.inbox import AgentInbox
from app.communication.outbox import AgentOutbox
from app.communication.channels import CommunicationChannel, ChannelName
from app.communication.subscriptions import AgentSubscription
from loguru import logger

class SubscriptionRegistry:
    """
    Registry for active Channels, Subscriber lists, and Agent Inbox/Outbox instances.
    """
    def __init__(self):
        self._inboxes: Dict[str, AgentInbox] = {}
        self._outboxes: Dict[str, AgentOutbox] = {}
        self._channels: Dict[str, CommunicationChannel] = {}
        self._subscriptions: Dict[str, AgentSubscription] = {}

        # Populate default channel list configs
        for cn in ChannelName:
            self._channels[cn.value] = CommunicationChannel(
                name=cn,
                description=f"Standard smart stadium inter-agent channel for {cn.value} operations."
            )

    def get_or_create_inbox(self, agent_id: str) -> AgentInbox:
        key = agent_id.strip().lower()
        if key not in self._inboxes:
            self._inboxes[key] = AgentInbox(agent_id)
            logger.info(f"Registry: Initialised new AgentInbox for '{agent_id}'")
        return self._inboxes[key]

    def get_or_create_outbox(self, agent_id: str) -> AgentOutbox:
        key = agent_id.strip().lower()
        if key not in self._outboxes:
            self._outboxes[key] = AgentOutbox(agent_id)
            logger.info(f"Registry: Initialised new AgentOutbox for '{agent_id}'")
        return self._outboxes[key]

    def list_channels(self) -> List[CommunicationChannel]:
        return list(self._channels.values())

    def register_channel(self, channel: CommunicationChannel) -> None:
        self._channels[channel.name.value] = channel
        logger.info(f"Registry: Registered custom channel '{channel.name}'")

    def register_subscription(self, subscription: AgentSubscription) -> None:
        self._subscriptions[subscription.agent_id.lower()] = subscription
        logger.info(f"Registry: Updated subscriptions map for agent '{subscription.agent_id}'")

    def unregister_subscription(self, agent_id: str) -> None:
        key = agent_id.lower()
        if key in self._subscriptions:
            del self._subscriptions[key]
            logger.info(f"Registry: Removed subscriptions map for agent '{agent_id}'")

    def get_subscribers_for_topic(self, topic: str) -> List[str]:
        subscribers = []
        t = topic.lower()
        for sub in self._subscriptions.values():
            if any(tp.lower() == t for tp in sub.topics):
                subscribers.append(sub.agent_id)
        return subscribers
