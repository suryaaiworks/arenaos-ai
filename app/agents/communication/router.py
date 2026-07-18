from typing import Dict
from app.agents.communication.channels import MessageChannel
from app.agents.communication.messages import Message, MessageType
from loguru import logger

class MessageRouter:
    """
    Routes internal communication messages to target channels or broadcasts.
    """
    def __init__(self):
        self._channels: Dict[str, MessageChannel] = {}

    def get_or_create_channel(self, channel_name: str) -> MessageChannel:
        if channel_name not in self._channels:
            self._channels[channel_name] = MessageChannel(channel_name)
        return self._channels[channel_name]

    def route_message(self, message: Message) -> None:
        """
        Routes the message based on its recipient header or message type.
        """
        headers = message.headers
        sender = headers.sender
        recipient = headers.recipient
        
        logger.info(f"MessageRouter: Routing message ID {message.message_id} from '{sender}'")

        if message.message_type == MessageType.BROADCAST:
            logger.info("MessageRouter: Broadcasting message to all active channels...")
            for ch in self._channels.values():
                ch.publish(message)
        elif recipient:
            channel = self.get_or_create_channel(recipient)
            channel.publish(message)
        else:
            logger.warning(f"MessageRouter: Message ID {message.message_id} has no recipient/broadcast type.")
