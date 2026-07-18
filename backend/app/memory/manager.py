from typing import Any, Dict
from loguru import logger

class ContextManager:
    """
    Consolidates contexts from ArenaMind, Agent, workflow processes, conversation logs,
    and user session metadata into normalized outputs.
    """
    def merge_contexts(
        self,
        arenamind_ctx: Dict[str, Any] = None,
        agent_ctx: Dict[str, Any] = None,
        workflow_ctx: Dict[str, Any] = None,
        conversation_ctx: Dict[str, Any] = None,
        tool_ctx: Dict[str, Any] = None,
        execution_ctx: Dict[str, Any] = None,
        session_ctx: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        logger.debug("ContextManager: Consolidating active execution context fields...")
        merged: Dict[str, Any] = {}

        if session_ctx:
            merged.update(session_ctx)
        if arenamind_ctx:
            merged.update(arenamind_ctx)
        if agent_ctx:
            merged.update(agent_ctx)
        if workflow_ctx:
            merged.update(workflow_ctx)
        if conversation_ctx:
            merged.update(conversation_ctx)
        if tool_ctx:
            merged.update(tool_ctx)
        if execution_ctx:
            merged.update(execution_ctx)

        logger.debug(f"ContextManager: Consolidation resolved {len(merged)} parameters.")
        return merged
