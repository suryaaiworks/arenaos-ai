from typing import List

class SecurityToolsRegistry:
    """
    Registry of required tool identifiers utilized by the SecurityAgent.
    """
    def get_required_tools(self) -> List[str]:
        return [
            "SearchTool",
            "IncidentTool",
            "NavigationTool",
            "NotificationTool",
            "AnalyticsTool",
            "DatabaseTool"
        ]
