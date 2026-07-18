import importlib
import os
from app.agents.base.base_agent import BaseAgent
from app.agents.manager.registry import agent_registry
from loguru import logger

class PluginLoader:
    """
    Scans app/agents/plugins/ directories, imports agent packages,
    and registers BaseAgent plugins automatically.
    """
    def discover_and_load_plugins(self) -> None:
        logger.info("PluginLoader: Scanning 'app/agents/plugins' for agent extensions...")
        plugins_dir = os.path.join(
            os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 
            "plugins"
        )
        
        if not os.path.exists(plugins_dir):
            logger.warning(f"PluginLoader: Plugins directory '{plugins_dir}' does not exist.")
            return

        # Read subfolders and load modules
        for item in os.listdir(plugins_dir):
            item_path = os.path.join(plugins_dir, item)
            if os.path.isdir(item_path) and not item.startswith("__"):
                try:
                    module_name = f"app.agents.plugins.{item}.agent"
                    module = importlib.import_module(module_name)
                    # Look for class subclassing BaseAgent and register it
                    for name in dir(module):
                        obj = getattr(module, name)
                        if isinstance(obj, type) and issubclass(obj, BaseAgent) and obj is not BaseAgent:
                            # Instantiate with default mock configs and register
                            from app.agents.base.manifest import AgentManifest
                            from app.agents.base.config import AgentConfiguration
                            
                            # Instantiate default manifest and configurations
                            manifest = AgentManifest(
                                name=f"{item.capitalize()}Agent",
                                description=f"Mock autonomous agent plugin for category {item}.",
                                category=item
                            )
                            config = AgentConfiguration()
                            agent_instance = obj(manifest=manifest, config=config)
                            agent_registry.register(agent_instance)
                            logger.info(f"PluginLoader: Loaded plugin class '{name}' successfully.")
                except Exception as e:
                    logger.debug(f"PluginLoader: Ignored or failed folder '{item}': {e}")
