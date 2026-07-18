from typing import Any, Dict, List
from loguru import logger

class ToolInputValidator:
    """
    Validates tool parameter payloads against input schema.
    """
    def validate_inputs(self, params: Dict[str, Any], input_schema: Dict[str, Any]) -> List[str]:
        """
        Validates context key types and returns a list of error strings.
        """
        logger.debug("Validator: Checking parameters against schema metadata...")
        errors = []
        
        # Check required fields
        required = input_schema.get("required", [])
        for field in required:
            if field not in params or params[field] is None:
                errors.append(f"Missing required parameter '{field}'.")

        # Check parameter types and enum constraints if present
        properties = input_schema.get("properties", {})
        for name, value in params.items():
            if name in properties:
                prop_meta = properties[name]
                prop_type = prop_meta.get("type")
                
                # Check enum
                if "enum" in prop_meta:
                    if value not in prop_meta["enum"]:
                        errors.append(f"Parameter '{name}' value '{value}' not in valid enums: {prop_meta['enum']}.")
                        
        return errors
