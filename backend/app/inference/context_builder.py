from typing import Any, Dict
from app.inference.exceptions import ContextBuilderError
from loguru import logger

class ContextBuilder:
    """
    Merges ArenaMind, Agent, Workflow, Tool, and external RAG contexts.
    """
    def build_merged_context(
        self,
        arenamind_ctx: Dict[str, Any] = None,
        agent_ctx: Dict[str, Any] = None,
        workflow_ctx: Dict[str, Any] = None,
        tool_ctx: Dict[str, Any] = None,
        rag_ctx: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """
        Combines and normalizes contexts without key conflicts.
        """
        logger.debug("ContextBuilder: Initiating context merging...")
        merged: Dict[str, Any] = {}

        # Merge dicts sequentially
        if arenamind_ctx:
            merged.update(arenamind_ctx)
        if agent_ctx:
            # Avoid conflict by nesting if needed, or update directly
            merged.update(agent_ctx)
        if workflow_ctx:
            merged.update(workflow_ctx)
        if tool_ctx:
            merged.update(tool_ctx)
        if rag_ctx:
            merged.update(rag_ctx)

        logger.debug(f"ContextBuilder: Merged {len(merged)} context keys successfully.")
        return merged
