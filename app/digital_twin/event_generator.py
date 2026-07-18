from typing import Any, Dict, List
from loguru import logger

class EventGenerator:
    """
    Schedules and generates hypothetical event timelines for simulated models.
    """
    def generate_events(self, scenario_name: str) -> List[Dict[str, Any]]:
        logger.debug(f"EventGenerator: Generating operational schedule for scenario '{scenario_name}'...")
        name_lower = scenario_name.lower()
        
        if "fire" in name_lower:
            return [
                {"time_offset_min": 0, "event": "Smoke detector triggered in Sector B Food Court"},
                {"time_offset_min": 2, "event": "Flames reported by local retail staff"},
                {"time_offset_min": 5, "event": "Sector evacuation sirens activated"}
            ]
        if "surge" in name_lower or "congestion" in name_lower:
            return [
                {"time_offset_min": 0, "event": "Match finishes; exit gates turnstiles count spikes"},
                {"time_offset_min": 3, "event": "Gate A queue length exceeds 50 meters"},
                {"time_offset_min": 7, "event": "Crowd density hits 5 people/sqm"}
            ]
        # Default fallback
        return [
            {"time_offset_min": 0, "event": f"Simulation test event initiated: {scenario_name}"}
        ]
