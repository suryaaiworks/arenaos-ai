from typing import List
from google.genai import types
from loguru import logger

class GeminiSafetyConfigurator:
    """
    Configures safety policy mappings using google.genai.types categories and thresholds.
    """
    def build_safety_settings(self) -> List[types.SafetySetting]:
        logger.debug("GeminiSafety: Loading default safety threshold rules...")
        
        # Configure standard categories with block thresholds
        settings = [
            types.SafetySetting(
                category=types.HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold=types.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
            ),
            types.SafetySetting(
                category=types.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold=types.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
            ),
            types.SafetySetting(
                category=types.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold=types.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
            ),
            types.SafetySetting(
                category=types.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold=types.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
            ),
        ]
        return settings
