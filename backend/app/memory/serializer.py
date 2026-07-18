import json
from typing import Any
from app.memory.exceptions import SerializationError
from loguru import logger

class MemorySerializer:
    """
    Serializes memory records to/from JSON strings.
    """
    def serialize(self, data: Any) -> str:
        try:
            logger.debug("MemorySerializer: Serialising object to JSON string...")
            return json.dumps(data, default=str)
        except Exception as e:
            logger.error(f"MemorySerializer: Serialization failed: {e}")
            raise SerializationError(f"Serialization failed: {str(e)}")

    def deserialize(self, raw_str: str) -> Any:
        try:
            logger.debug("MemorySerializer: Deserialising JSON string to object...")
            return json.loads(raw_str)
        except Exception as e:
            logger.error(f"MemorySerializer: Deserialization failed: {e}")
            raise SerializationError(f"Deserialization failed: {str(e)}")
