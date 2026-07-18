from typing import List

class CrowdToolsRegistry:
    """
    Registry of required tool identifiers utilized by the CrowdAgent.
    """
    def get_required_tools(self) -> List[str]:
        return [
            "AnalyticsTool",
            "NavigationTool",
            "IncidentTool",
            "NotificationTool",
            "DatabaseTool",
            "SearchTool"
        ]
