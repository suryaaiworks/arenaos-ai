from typing import List
from app.digital_twin.zones import StadiumZone, ZoneStatus
from loguru import logger

class DigitalTwinSimulator:
    """
    Manages active stadium zone occupancy transfers and safety risk scores propagation.
    """
    def __init__(self):
        self._zones: List[StadiumZone] = []
        self._initialize_default_zones()

    def _initialize_default_zones(self) -> None:
        logger.debug("DigitalTwinSimulator: Building virtual stadium zones...")
        self._zones = [
            StadiumZone(location_id="gate_entry", name="Entry Gates", capacity=5000, occupancy=2000, risk_score=0.1),
            StadiumZone(location_id="gate_exit", name="Exit Gates", capacity=5000, occupancy=100, risk_score=0.0),
            StadiumZone(location_id="vip_suite", name="VIP Area", capacity=500, occupancy=300, risk_score=0.0),
            StadiumZone(location_id="food_court", name="Food Court", capacity=1500, occupancy=1200, risk_score=0.2),
            StadiumZone(location_id="parking_lot", name="Parking", capacity=3000, occupancy=1500, risk_score=0.0),
            StadiumZone(location_id="main_arena", name="Main Arena", capacity=40000, occupancy=35000, risk_score=0.1),
            StadiumZone(location_id="emergency_exit", name="Emergency Exits", capacity=10000, occupancy=0, risk_score=0.0),
            StadiumZone(location_id="med_center", name="Medical Center", capacity=100, occupancy=5, risk_score=0.0),
            StadiumZone(location_id="control_room", name="Control Room", capacity=50, occupancy=10, risk_score=0.0),
            StadiumZone(location_id="restrooms", name="Restrooms", capacity=300, occupancy=150, risk_score=0.0),
            StadiumZone(location_id="retail_area", name="Retail Area", capacity=800, occupancy=400, risk_score=0.0)
        ]

    def get_zones(self) -> List[StadiumZone]:
        return self._zones

    def propagate_risk(self, target_zone_id: str, risk_increment: float) -> None:
        logger.debug(f"DigitalTwinSimulator: Propagating risk score {risk_increment} to zone '{target_zone_id}'...")
        for zone in self._zones:
            if zone.location_id == target_zone_id:
                zone.risk_score = min(1.0, zone.risk_score + risk_increment)
                if zone.risk_score > 0.7:
                    zone.status = ZoneStatus.CRITICAL
                elif zone.risk_score > 0.4:
                    zone.status = ZoneStatus.CONGESTED
                break
                
    def execute_time_step(self, time_step_min: int) -> None:
        logger.debug(f"DigitalTwinSimulator: Progressing virtual clock state by {time_step_min} minutes...")
        # Simulate people moving from food court and entry gates to main arena, or evacuating
        for zone in self._zones:
            if zone.location_id == "food_court" and zone.occupancy > 100:
                zone.occupancy -= 50 * time_step_min
            if zone.location_id == "main_arena" and zone.occupancy < zone.capacity:
                zone.occupancy += 40 * time_step_min
