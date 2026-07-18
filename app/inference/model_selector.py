from app.inference.policies import ModelPolicy
from loguru import logger

class ModelSelector:
    """
    Selects target model and provider identifiers based on ModelPolicy guidelines.
    """
    def choose_model_and_provider(self, policy: ModelPolicy) -> tuple[str, str]:
        """
        Returns (provider, model_name) tuple context.
        """
        logger.debug("ModelSelector: Resolving provider mappings...")
        
        # In a real environment, we'd check availability. For now, route based on policy choices
        preferred = policy.preferred_model
        
        if "gemini" in preferred:
            provider = "gemini"
            model = preferred
        else:
            provider = "mock"
            model = policy.fallback_model
            
        logger.info(f"ModelSelector: Selected provider '{provider}' and model '{model}'")
        return provider, model
