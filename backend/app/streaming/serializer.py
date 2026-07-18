import json
import uuid
from datetime import datetime
from typing import Any

class EventSerializer:
    """
    JSON encoder utility translating UUIDs and Datetimes to standard string formats.
    """
    def serialize(self, obj: Any) -> str:
        return json.dumps(obj, default=self._default_encoder)

    def _default_encoder(self, obj: Any) -> Any:
        if isinstance(obj, uuid.UUID):
            return str(obj)
        if isinstance(obj, datetime):
            return obj.isoformat()
        raise TypeError(f"Object of type {obj.__class__.__name__} is not JSON serializable")
