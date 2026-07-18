from enum import Enum

class AgentCapability(str, Enum):
    """
    Standard capabilities that agents can declare.
    """
    IMAGE_ANALYSIS = "image_analysis"
    REASONING = "reasoning"
    PREDICTION = "prediction"
    MONITORING = "monitoring"
    RECOMMENDATION = "recommendation"
    NAVIGATION = "navigation"
    DECISION_SUPPORT = "decision_support"
    REPORTING = "reporting"
