import importlib
import os
from app.toolkit.base.tool import BaseTool
from app.toolkit.registry.registry import tool_registry
from loguru import logger

class ToolDiscovery:
    """
    Scans app/toolkit/plugins/ directories, imports packages,
    and dynamically registers BaseTool plugins.
    """
    def discover_and_load_tools(self) -> None:
        logger.info("ToolDiscovery: Scanning 'app/toolkit/plugins' for tool extensions...")
        plugins_dir = os.path.join(
            os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 
            "plugins"
        )
        
        if not os.path.exists(plugins_dir):
            logger.warning(f"ToolDiscovery: Plugins directory '{plugins_dir}' does not exist.")
            return

        # Scan subdirectories
        for item in os.listdir(plugins_dir):
            item_path = os.path.join(plugins_dir, item)
            if os.path.isdir(item_path) and not item.startswith("__"):
                try:
                    module_name = f"app.toolkit.plugins.{item}.tool"
                    module = importlib.import_module(module_name)
                    # Look for class subclassing BaseTool
                    for name in dir(module):
                        obj = getattr(module, name)
                        if isinstance(obj, type) and issubclass(obj, BaseTool) and obj is not BaseTool:
                            # Instantiate tool with mock manifest/config parameters
                            from app.toolkit.base.manifest import ToolManifest
                            from app.toolkit.base.config import ToolConfiguration
                            
                            manifest = ToolManifest(
                                name=f"{item.capitalize()}Tool",
                                description=f"Mock stadium tool helper for category {item}.",
                                category=item,
                                input_schema={
                                    "type": "object",
                                    "properties": {
                                        "query": {"type": "string"},
                                        "limit": {"type": "integer"}
                                    },
                                    "required": ["query"]
                                }
                            )
                            config = ToolConfiguration()
                            tool_instance = obj(manifest=manifest, config=config)
                            tool_registry.register(tool_instance)
                            logger.info(f"ToolDiscovery: Dynamically loaded tool '{name}' successfully.")
                except Exception as e:
                    logger.debug(f"ToolDiscovery: Failed or ignored folder '{item}': {e}")
