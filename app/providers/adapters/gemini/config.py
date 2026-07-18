from typing import Optional
from pydantic import Field
from app.providers.base.config import ProviderConfiguration

class GeminiProviderConfiguration(ProviderConfiguration):
    """
    Subclass managing Google GenAI SDK configuration values.
    """
    api_key: Optional[str] = Field(default=None)
    google_api_key: Optional[str] = Field(default=None)
    model: str = Field(default="gemini-1.5-flash")
    timeout: float = Field(default=30.0)
    max_output_tokens: int = Field(default=2048)
    temperature: float = Field(default=0.7)
    top_p: float = Field(default=1.0)
    top_k: int = Field(default=40)
