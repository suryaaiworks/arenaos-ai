from typing import Optional
from pydantic import Field
from app.providers.base.config import ProviderConfiguration

class GeminiProviderConfiguration(ProviderConfiguration):
    """
    Settings mapping attributes required by Google Gemini model api formats.
    """
    google_api_key: Optional[str] = Field(default=None, description="Google Gemini API authentication token")
    api_version: str = Field(default="v1beta", description="API version context endpoint")
