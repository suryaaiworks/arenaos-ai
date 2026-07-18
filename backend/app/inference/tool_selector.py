from typing import Any, Dict, List
from app.toolkit.registry.registry import tool_registry
from loguru import logger

class ToolSelector:
    """
    Selects candidate tool manifests from ToolRegistry to pass down to providers.
    """
    def select_candidate_tools(self, capabilities_required: List[str]) -> List[Dict[str, Any]]:
        """
        Retrieves candidate tool manifests filtering by capabilities tags.
        """
        logger.debug(f"ToolSelector: Filtering candidate tools matching capabilities: {capabilities_required}")
        candidates = []
        
        all_tools = tool_registry.list_tools()
        for t in all_tools.values():
            # If no capabilities required, load all by default, or check tags matching
            if not capabilities_required:
                candidates.append(t.manifest.model_dump())
            else:
                # Compare tag matches
                tags = [tag.strip().lower() for tag in t.manifest.tags]
                matches = any(c.strip().lower() in tags for c in capabilities_required)
                if matches or t.manifest.category in capabilities_required:
                    candidates.append(t.manifest.model_dump())
                    
        logger.debug(f"ToolSelector: Selected {len(candidates)} candidate tools.")
        return candidates
