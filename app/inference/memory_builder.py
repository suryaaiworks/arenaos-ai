from typing import Any, Dict, List
from loguru import logger

class MemoryBuilder:
    """
    Constructs memory context wrappers (Short, Long, Session, History) into prompt tags.
    """
    def format_memories_to_prompt(
        self,
        short_mem: Dict[str, Any] = None,
        long_mem: Dict[str, Any] = None,
        session_mem: Dict[str, Any] = None,
        history: List[Dict[str, Any]] = None
    ) -> str:
        logger.debug("MemoryBuilder: Formatting memories for prompt inclusion...")
        parts = []

        if session_mem:
            parts.append("Session Memory State:")
            parts.append(str(session_mem))
            
        if short_mem:
            parts.append("Transient Short-term Memory:")
            parts.append(str(short_mem))

        if history:
            parts.append("Conversation History logs:")
            for turn in history:
                role = turn.get("role", "user")
                content = turn.get("content", "")
                parts.append(f"  {role.upper()}: {content}")

        if long_mem:
            parts.append("Retrieved Long-term Memory:")
            parts.append(str(long_mem))

        return "\n\n".join(parts) if parts else ""
