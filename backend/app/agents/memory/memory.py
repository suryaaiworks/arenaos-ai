from abc import ABC, abstractmethod
from typing import Any, Dict, Optional

class MemoryInterface(ABC):
    """
    Interface for agent memory adapters (Redis, SQLite, Vector DB, etc.).
    """
    @abstractmethod
    async def get(self, key: str) -> Optional[Any]:
        pass

    @abstractmethod
    async def set(self, key: str, value: Any, expire_sec: Optional[int] = None) -> None:
        pass

    @abstractmethod
    async def delete(self, key: str) -> None:
        pass

    @abstractmethod
    async def clear(self) -> None:
        pass


class ShortTermMemory(MemoryInterface):
    """
    In-memory transient cache memory.
    """
    def __init__(self):
        self._data: Dict[str, Any] = {}

    async def get(self, key: str) -> Optional[Any]:
        return self._data.get(key)

    async def set(self, key: str, value: Any, expire_sec: Optional[int] = None) -> None:
        self._data[key] = value

    async def delete(self, key: str) -> None:
        if key in self._data:
            del self._data[key]

    async def clear(self) -> None:
        self._data.clear()


class LongTermMemory(MemoryInterface):
    """
    Persistence adapter placeholder interface (Vector DB / SQLite mapping).
    """
    def __init__(self):
        self._data: Dict[str, Any] = {}

    async def get(self, key: str) -> Optional[Any]:
        return self._data.get(key)

    async def set(self, key: str, value: Any, expire_sec: Optional[int] = None) -> None:
        self._data[key] = value

    async def delete(self, key: str) -> None:
        if key in self._data:
            del self._data[key]

    async def clear(self) -> None:
        self._data.clear()
