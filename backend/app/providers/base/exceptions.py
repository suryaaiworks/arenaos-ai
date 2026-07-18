class ProviderException(Exception):
    """
    Base exception class for all model provider failures.
    """
    def __init__(self, message: str):
        super().__init__(message)
        self.message = message


class ProviderUnavailable(ProviderException):
    """
    Raised when the target model provider endpoint is down or connection times out on dial.
    """
    pass


class ProviderTimeout(ProviderException):
    """
    Raised when LLM generation request times out.
    """
    pass


class InvalidProviderRequest(ProviderException):
    """
    Raised when the request parameters fail provider validation checks.
    """
    pass


class ModelNotFound(ProviderException):
    """
    Raised when the specified model string is unsupported by the target provider.
    """
    pass


class RateLimitExceeded(ProviderException):
    """
    Raised when model provider API triggers 429 quota exhaustion errors.
    """
    pass


class AuthenticationFailed(ProviderException):
    """
    Raised when model provider keys are missing or rejected on handshake.
    """
    pass
