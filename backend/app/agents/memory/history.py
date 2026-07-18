from typing import Any, Dict, List

class HistoryLog:
    """
    Log containing conversation transcripts or task execution traces.
    """
    def __init__(self):
        self._history: List[Dict[str, Any]] = []

    async def log_action(self, action: str, details: Dict[str, Any]) -> None:
        self._history.append({"action": action, "details": details})

    async def get_history(self) -> List[Dict[str, Any]]:
        return self._history

    async def clear_history(self) -> None:
        self._history.clear()
