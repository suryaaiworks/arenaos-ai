from typing import Any, Dict, List
from app.replay.timeline import ReplayTimeline
from loguru import logger

class TimelineBuilder:
    """
    Chronologically sorts and normalizes incident data logs.
    """
    def build_chronological_sequence(self, mission_context_dict: Dict[str, Any], stream_events: List[Dict[str, Any]]) -> ReplayTimeline:
        logger.debug("TimelineBuilder: Sorting incident event records chronologically...")
        timeline = ReplayTimeline()
        
        # 1. Mission Creation entry
        timeline.add_step(
            "Mission Created",
            f"Orchestration session initialized for: '{mission_context_dict.get('mission_type', 'Security Threat')}'",
            {"mission_id": mission_context_dict.get("mission_id")}
        )
        
        # 2. Add agents assignments
        for agent in mission_context_dict.get("participating_agents", []):
            timeline.add_step(
                "Agent Assigned",
                f"Agent '{agent}' assigned to collaborate on task containment.",
                {"agent_id": agent}
            )

        # 3. Add stream logs steps if available
        for event in stream_events:
            e_type = event.get("event_type", "System Event")
            timeline.add_step(
                e_type,
                f"Event triggered by {event.get('source')}: {event.get('payload', {}).get('status', 'active')}",
                {"event_id": event.get("event_id")}
            )
            
        # 4. Mission completion entry
        timeline.add_step(
            "Mission Completed",
            f"Mission concluded successfully. Status: {mission_context_dict.get('status')}",
            {"overall_risk": mission_context_dict.get("overall_risk")}
        )
        
        return timeline
