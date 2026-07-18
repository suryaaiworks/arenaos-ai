import json
from typing import Any
from app.communication.messages import AgentMessage
from app.communication.exceptions import ValidationError
from loguru import logger

class MessageSerializer:
    """
    Serializes AgentMessage packets to/from JSON format.
    """
    def serialize(self, msg: AgentMessage) -> str:
        try:
            logger.debug(f"MsgSerializer: Serialising message '{msg.message_id}'...")
            return msg.model_dump_json()
        except Exception as e:
            logger.error(f"MsgSerializer: Serialization failed: {e}")
            raise ValidationError(f"MsgSerializer: Serialization failed: {str(e)}")

    def deserialize(self, raw_str: str) -> AgentMessage:
        try:
            logger.debug("MsgSerializer: Deserialising message JSON string...")
            return AgentMessage.model_validate_json(raw_str)
        except Exception as e:
            logger.error(f"MsgSerializer: Deserialization failed: {e}")
            raise ValidationError(f"MsgSerializer: Deserialization failed: {str(e)}")
