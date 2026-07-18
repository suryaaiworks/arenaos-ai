from typing import Any, Dict, List
from app.digital_twin.zones import StadiumZone

class DigitalTwinAnalytics:
    """
    Computes risk heatmaps and zones state metrics.
    """
    def generate_heatmap(self, zones: List[StadiumZone]) -> List[Dict[str, Any]]:
        heatmap = []
        for zone in zones:
            heatmap.append({
                "zone_name": zone.name,
                "location_id": zone.location_id,
                "risk_score": zone.risk_score,
                "occupancy_rate": zone.occupancy / zone.capacity if zone.capacity > 0 else 0.0
            })
        return heatmap
