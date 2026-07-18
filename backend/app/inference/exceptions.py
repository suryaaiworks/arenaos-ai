class InferenceEngineException(Exception):
    """
    Base exception class for all Inference Engine operation failures.
    """
    def __init__(self, message: str):
        super().__init__(message)
        self.message = message


class PromptBuilderError(InferenceEngineException):
    """
    Raised when building the prompt text formats fails.
    """
    pass


class ContextBuilderError(InferenceEngineException):
    """
    Raised when merging contexts fails.
    """
    pass


class ValidationError(InferenceEngineException):
    """
    Raised when LLM outputs fail validators structural checks.
    """
    pass


class RetryExceeded(InferenceEngineException):
    """
    Raised when retry policies limits are exceeded.
    """
    pass
