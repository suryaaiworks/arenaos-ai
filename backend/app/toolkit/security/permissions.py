from enum import Enum
from typing import List
from loguru import logger

class ToolPermission(str, Enum):
    """
    Standard permissions list to restrict execution of toolkit plugins.
    """
    READ_DATABASE = "Read Database"
    WRITE_DATABASE = "Write Database"
    READ_INCIDENTS = "Read Incidents"
    MANAGE_EVENTS = "Manage Events"
    READ_PARKING = "Read Parking"
    READ_CROWD = "Read Crowd"
    READ_NAVIGATION = "Read Navigation"


class PermissionValidator:
    """
    Validates tool-required permissions against the execution context scopes.
    """
    def check_permissions(self, context_permissions: List[str], required_permissions: List[str]) -> bool:
        """
        Returns True if all required permissions are available in context scopes.
        """
        logger.debug(f"Permissions: Context scopes: {context_permissions} | Required: {required_permissions}")
        
        # Simple string inclusion validation checking
        context_set = {p.strip().lower() for p in context_permissions}
        
        for req in required_permissions:
            if req.strip().lower() not in context_set:
                logger.error(f"Permissions: Validation failed. Missing permission: '{req}'")
                return False
                
        return True
