from app.toolkit.registry.discovery import ToolDiscovery
from app.toolkit.registry.registry import tool_registry

class ToolMonitor:
    """
    Monitors active tool plugins and execution counts.
    """
    def get_tool_metrics(self) -> dict:
        loaded = list(tool_registry._tools.keys()) if hasattr(tool_registry, "_tools") else []
        return {
            "registered_tools_count": len(loaded),
            "loaded_tool_ids": loaded,
            "pipeline_status": "operational"
        }
