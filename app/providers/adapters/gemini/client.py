from google import genai
from app.providers.adapters.gemini.config import GeminiProviderConfiguration
from app.providers.adapters.gemini.errors import GeminiErrorTranslator
from loguru import logger

class GeminiClient:
    """
    Client wrapper for the official Google GenAI SDK.
    Initialises Client interfaces and manages error conversions.
    """
    def __init__(self, config: GeminiProviderConfiguration):
        self.config = config
        self.translator = GeminiErrorTranslator()
        
        # Use api_key from config
        api_key = config.google_api_key or config.api_key
        
        if not api_key:
            logger.warning("GeminiClient: Authentication key is missing. SDK will run unauthenticated.")
            self._client = None
        else:
            logger.info("GeminiClient: Initialising official GenAI SDK Client...")
            self._client = genai.Client(api_key=api_key)

    @property
    def raw_client(self) -> genai.Client:
        if not self._client:
            raise ValueError("GenAI SDK Client not initialised (missing API key).")
        return self._client

    def has_credentials(self) -> bool:
        return self._client is not None
