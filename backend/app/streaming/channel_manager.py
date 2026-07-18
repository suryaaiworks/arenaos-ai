from typing import Set
from loguru import logger

class ChannelManager:
    """
    Registers and tracks active topic categories.
    """
    def __init__(self):
        self._channels: Set[str] = {
            "security", "crowd", "emergency", "mission", "simulation", "system"
        }

    def register_channel(self, name: str) -> None:
        self._channels.add(name.strip().lower())
        logger.debug(f"ChannelManager: Registered topic channel '{name}'")

    def get_channels(self) -> Set[str]:
        return self._channels
