class ArenaMindException(Exception):
    """
    Base exception class for all ArenaMind orchestrator operations.
    """
    def __init__(self, message: str):
        super().__init__(message)
        self.message = message


class AgentNotFound(ArenaMindException):
    """
    Raised when a requested category or agent registration plugin cannot be found.
    """
    pass


class WorkflowFailure(ArenaMindException):
    """
    Raised when execution of steps inside the workflow engine fails.
    """
    pass


class InvalidRequest(ArenaMindException):
    """
    Raised when incoming requests fail validator structural check parameters.
    """
    pass


class DispatchFailure(ArenaMindException):
    """
    Raised when the dispatcher fails to instantiate or coordinate execution with a plugin agent.
    """
    pass


class ConfigurationError(ArenaMindException):
    """
    Raised when settings configurations parameters are malformed.
    """
    pass
