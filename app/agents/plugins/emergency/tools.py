from typing import List

class EmergencyToolsRegistry:
    """
    Registry of required tool identifiers utilized by the EmergencyAgent.
    """
    def get_required_tools(self) -> List[str]:
        return [
            "NotificationTool",
            "AnalyticsTool",
            "NavigationTool",
            "IncidentTool",
            "DatabaseTool",
            "SearchTool"
        ]
