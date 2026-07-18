from abc import ABC, abstractmethod
import time
from typing import Any, Dict, List
from app.toolkit.base.manifest import ToolManifest
from app.toolkit.base.config import ToolConfiguration
from app.toolkit.base.validator import ToolInputValidator
from loguru import logger

class BaseTool(ABC):
    """
    Abstract Base Tool class defining lifecycle, schema configurations, permissions check scopes,
    and automatic execution observability counters.
    """
    def __init__(self, manifest: ToolManifest, config: ToolConfiguration):
        self.manifest = manifest
        self.config = config
        self.uptime_start = time.time()
        self.exec_count = 0
        self.total_latency = 0.0
        self.last_exec_time = 0.0
        self._validator = ToolInputValidator()

        # EXTENSION POINT HOOKS (For Future Model Context Protocol Integration)
        # -------------------------------------------------------------
        # 1. MCP client context: self._mcp_client = None
        # 2. Remote execution link: self._remote_execution_url = None
        # 3. Dynamic schema mappings: self._dynamic_schema_cache = None

    async def initialize(self) -> None:
        """
        Runs initial setups when loading the tool instance.
        """
        logger.debug(f"Tool [{self.manifest.name}]: Initialising plugin context...")

    async def validate(self, params: Dict[str, Any]) -> bool:
        """
        Validates parameters payload against manifest input schemas.
        """
        errors = self._validator.validate_inputs(params, self.manifest.input_schema)
        if errors:
            logger.error(f"Tool [{self.manifest.name}]: Parameters validation failed: {errors}")
            return False
        return True

    @abstractmethod
    async def execute(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """
        Runs the core tool actions utility.
        """
        pass

    async def cleanup(self) -> None:
        """
        Frees resources (e.g. locks, connections).
        """
        logger.debug(f"Tool [{self.manifest.name}]: Cleaning up active sockets...")

    async def health(self) -> dict:
        """
        Exposes observability and diagnostic wellness parameters.
        """
        uptime = time.time() - self.uptime_start
        avg_latency = self.total_latency / self.exec_count if self.exec_count > 0 else 0.0
        return {
            "name": self.manifest.name,
            "enabled": self.config.enabled,
            "uptime_seconds": round(uptime, 2),
            "execution_count": self.exec_count,
            "average_latency_seconds": round(avg_latency, 4),
            "last_execution": self.last_exec_time,
            "permissions": self.manifest.permissions
        }

    async def metadata(self) -> dict:
        return self.manifest.model_dump()

    async def schema(self) -> dict:
        return self.manifest.input_schema

    async def permissions(self) -> List[str]:
        return self.manifest.permissions
