from typing import Any, Dict, List
from app.digital_twin.event_generator import EventGenerator

class ScenarioManager:
    """
    Sets up active simulation models templates.
    """
    def __init__(self):
        self._generator = EventGenerator()

    def build_scenario_context(self, name: str) -> Dict[str, Any]:
        events = self._generator.generate_events(name)
        
        # Match affected sector tags
        affected_zone = "Food Court"
        if "gate" in name.lower() or "exit" in name.lower() or "entry" in name.lower():
            affected_zone = "Entry Gates"
        if "vip" in name.lower() or "medical" in name.lower():
            affected_zone = "VIP Area"
            
        return {
            "scenario_name": name,
            "primary_affected_zone": affected_zone,
            "scheduled_events": events,
            "active_drills_enabled": "drill" in name.lower()
        }
