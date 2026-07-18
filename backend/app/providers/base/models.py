from enum import Enum

class ModelName(str, Enum):
    """
    Standard model identifiers supported by the ArenaOS AI providers layer.
    """
    GEMINI_1_5_PRO = "gemini-1.5-pro"
    GEMINI_1_5_FLASH = "gemini-1.5-flash"
    GEMINI_2_0_FLASH = "gemini-2.0-flash"
    MOCK_MODEL = "mock-model"
