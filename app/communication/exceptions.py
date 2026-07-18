class CommunicationHubException(Exception):
    """
    Base exception class for all Inter-Agent Communication Hub operations.
    """
    def __init__(self, message: str):
        super().__init__(message)
        self.message = message


class ChannelNotFound(CommunicationHubException):
    pass


class ReceiverUnavailable(CommunicationHubException):
    pass


class ValidationError(CommunicationHubException):
    pass


class DeadLetterException(CommunicationHubException):
    pass
