from typing import Any, Dict, List, Optional
from app.inference.exceptions import PromptBuilderError
from loguru import logger

class PromptBuilder:
    """
    Constructs and formats system/developer/user prompts, context payloads, and tool rules.
    """
    def build_system_prompt(self, system_prompt: Optional[str], developer_prompt: Optional[str]) -> str:
        parts = []
        if system_prompt:
            parts.append(system_prompt)
        if developer_prompt:
            parts.append(f"Developer Constraints:\n{developer_prompt}")
        return "\n\n".join(parts) if parts else "You are an ArenaOS AI Smart Stadium command assistant."

    def build_user_prompt(
        self,
        user_prompt: str,
        context: Dict[str, Any],
        tool_instructions: Optional[str] = None,
        safety_instructions: Optional[str] = None
    ) -> str:
        """
        Builds the user prompt injecting context keys and instructions templates.
        """
        logger.debug("PromptBuilder: Structuring user prompt payload...")
        parts = []

        if context:
            parts.append("Context variables:")
            for k, v in context.items():
                parts.append(f"- {k}: {v}")
            parts.append("")

        parts.append(f"Query: {user_prompt}")

        if tool_instructions:
            parts.append(f"\nTooling Rules:\n{tool_instructions}")
            
        if safety_instructions:
            parts.append(f"\nSafety Guidelines:\n{safety_instructions}")

        return "\n".join(parts)
