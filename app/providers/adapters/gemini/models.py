from enum import Enum

class GeminiModel(str, Enum):
    """
    Official Google Gemini models supported by the SDK adapter.
    """
    GEMINI_1_5_PRO = "gemini-1.5-pro"
    GEMINI_1_5_FLASH = "gemini-1.5-flash"
    GEMINI_2_0_FLASH = "gemini-2.0-flash"
