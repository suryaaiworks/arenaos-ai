from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional
from loguru import logger

class MemoryStorageInterface(ABC):
    """
    Abstract Interface for Memory Storage Engines (In-Memory, Redis, PostgreSQL, VectorDB).
    """
    @abstractmethod
    async def get(self, key: str) -> Optional[Any]:
        pass

    @abstractmethod
    async def set(self, key: str, value: Any, ttl: Optional[float] = None) -> None:
        pass

    @abstractmethod
    async def delete(self, key: str) -> None:
        pass

    @abstractmethod
    async def clear(self) -> None:
        pass


class InMemoryStorage(MemoryStorageInterface):
    """
    Volatile in-memory implementation of the memory storage interface.
    """
    def __init__(self):
        self._data: Dict[str, Any] = {}

    async def get(self, key: str) -> Optional[Any]:
        logger.debug(f"InMemoryStorage: Fetching key '{key}'...")
        return self._data.get(key)

    async def set(self, key: str, value: Any, ttl: Optional[float] = None) -> None:
        logger.debug(f"InMemoryStorage: Setting key '{key}'...")
        self._data[key] = value

    async def delete(self, key: str) -> None:
        logger.debug(f"InMemoryStorage: Deleting key '{key}'...")
        if key in self._data:
            del self._data[key]

    async def clear(self) -> None:
        logger.debug("InMemoryStorage: Flushing all records...")
        self._data.clear()


# Storage placeholders for future providers integrations
class PostgreSQLStorage(MemoryStorageInterface):
    async def get(self, key: str) -> Optional[Any]: raise NotImplementedError()
    async def set(self, key: str, value: Any, ttl: Optional[float] = None) -> None: raise NotImplementedError()
    async def delete(self, key: str) -> None: raise NotImplementedError()
    async def clear(self) -> None: raise NotImplementedError()


class RedisStorage(MemoryStorageInterface):
    async def get(self, key: str) -> Optional[Any]: raise NotImplementedError()
    async def set(self, key: str, value: Any, ttl: Optional[float] = None) -> None: raise NotImplementedError()
    async def delete(self, key: str) -> None: raise NotImplementedError()
    async def clear(self) -> None: raise NotImplementedError()
