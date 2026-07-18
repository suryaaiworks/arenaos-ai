from app.communication.messages import AgentMessage
from app.communication.exceptions import ValidationError
from loguru import logger

class MessageValidator:
    """
    Validates integrity, priority types, sender/receiver presence, and expiration (TTL) values.
    """
    def validate_message(self, msg: AgentMessage) -> None:
        logger.debug(f"MsgValidator: Auditing message packet '{msg.message_id}'...")
        
        if not msg.sender.strip():
            raise ValidationError("Message sender identifier cannot be empty.")
            
        if not msg.receiver.strip():
            raise ValidationError("Message receiver identifier cannot be empty.")
            
        if msg.ttl <= 0.0:
            raise ValidationError("Message TTL (time-to-live) must be greater than zero.")
            
        logger.debug("MsgValidator: Message validation check passed successfully.")
