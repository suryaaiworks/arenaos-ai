from app.streaming.event_models import SystemEvent

class EventFilter:
    """
    Evaluates whether event packets match subscriber topic or priority guidelines.
    """
    def matches(self, event: SystemEvent, topic: str) -> bool:
        if not topic or topic == "*" or topic == "all":
            return True
        # Simple substring match
        return topic.lower() in event.event_type.lower()
