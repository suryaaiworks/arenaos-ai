from typing import Any, Dict, Optional
from app.agents.memory.memory import ShortTermMemory

class SessionMemory:
    """
    Session-level memory tracking short-term context metadata.
    """
    def __init__(self):
        self._mem = ShortTermMemory()

    async def get_session_data(self, session_id: str) -> Optional[Dict[str, Any]]:
        return await self._mem.get(session_id)

    async def save_session_data(self, session_id: str, data: Dict[str, Any]) -> None:
        await self._mem.set(session_id, data)

    async def delete_session(self, session_id: str) -> None:
        await self._mem.delete(session_id)
