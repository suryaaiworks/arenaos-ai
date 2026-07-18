class MemoryEngineException(Exception):
    """
    Base exception class for all Memory Engine operations.
    """
    def __init__(self, message: str):
        super().__init__(message)
        self.message = message


class SessionNotFound(MemoryEngineException):
    pass


class MemoryExpired(MemoryEngineException):
    pass


class SerializationError(MemoryEngineException):
    pass


class StorageError(MemoryEngineException):
    pass
