import time
import uuid
from typing import Any, Dict
from app.digital_twin.scenario_schemas import SimulationReport
from app.digital_twin.simulator import DigitalTwinSimulator
from app.digital_twin.scenario_manager import ScenarioManager
from app.digital_twin.analytics import DigitalTwinAnalytics
from app.orchestrator.mission_orchestrator import mission_orchestrator
from app.orchestrator.mission_schemas import MissionStartRequest
from loguru import logger

class ScenarioExecutor:
    """
    Orchestrates execution loops driving simulated virtual representation states.
    """
    def __init__(self):
        self.manager = ScenarioManager()
        self.analytics = DigitalTwinAnalytics()

    async def execute_simulation(
        self,
        sim: SimulationReport,
        prompt: str,
        session_id: str,
        context_dict: Dict[str, Any]
    ) -> None:
        logger.info(f"ScenarioExecutor: Launching simulator thread for simulation '{sim.simulation_id}'...")
        start_time = time.time()
        
        sim.timeline.append(f"{time.strftime('%H:%M:%S')} - Simulation engine initialized")
        
        # 1. Initialize virtual twin simulator
        simulator = DigitalTwinSimulator()
        
        # Build template
        profile = self.manager.build_scenario_context(sim.scenario_name)
        zone_id = "food_court"
        if profile["primary_affected_zone"] == "Entry Gates":
            zone_id = "gate_entry"
        elif profile["primary_affected_zone"] == "VIP Area":
            zone_id = "vip_suite"

        sim.affected_zones.append(profile["primary_affected_zone"])
        sim.timeline.append(f"{time.strftime('%H:%M:%S')} - Scenario context loaded. Target zone: {profile['primary_affected_zone']}")
        
        # 2. Propagate risks in virtual model
        simulator.propagate_risk(zone_id, 0.6)
        sim.risk_progression.append({
            "step": 0,
            "zone": zone_id,
            "risk_score": 0.6,
            "status": "CONGESTED"
        })
        
        # 3. Call MissionOrchestrator to trigger collaborative response
        logger.info("ScenarioExecutor: Triggering MissionOrchestrator collaboration dispatches...")
        mission_req = MissionStartRequest(
            session_id=session_id,
            incident=prompt,
            context=context_dict
        )
        
        from app.streaming.engine import event_streaming_engine
        event_streaming_engine.publish_event(
            event_type="Simulation Started",
            source="DigitalTwin",
            payload={"scenario": sim.scenario_name},
            priority="MEDIUM",
            mission_id=sim.simulation_id
        )
        event_streaming_engine.publish_event(
            event_type="Mission Started",
            source="MissionOrchestrator",
            payload={"incident": prompt},
            priority="HIGH",
            mission_id=sim.simulation_id
        )
        
        try:
            mission_res = await mission_orchestrator.orchestrate_mission(mission_req)
            
            # Map coordination outcomes
            sim.participating_agents = list(mission_res.participating_agents)
            sim.agent_decisions = dict(mission_res.agent_results)
            sim.recommended_actions = list(mission_res.recommended_actions)
            
            event_streaming_engine.publish_event(
                event_type="Agent Assigned",
                source="MissionOrchestrator",
                payload={"agents": sim.participating_agents},
                priority="MEDIUM",
                mission_id=sim.simulation_id
            )
            
            # Publish alerts based on assigned agents
            for agent in sim.participating_agents:
                if agent == "security":
                    event_streaming_engine.publish_event(
                        event_type="Security Alert", source="SecurityAgent", payload={"status": "active"}, priority="HIGH", mission_id=sim.simulation_id
                    )
                elif agent == "crowd":
                    event_streaming_engine.publish_event(
                        event_type="Crowd Alert", source="CrowdAgent", payload={"status": "active"}, priority="HIGH", mission_id=sim.simulation_id
                    )
                elif agent == "emergency":
                    event_streaming_engine.publish_event(
                        event_type="Emergency Alert", source="EmergencyAgent", payload={"status": "active"}, priority="CRITICAL", mission_id=sim.simulation_id
                    )

            for timeline_entry in mission_res.timeline:
                sim.timeline.append(f"[COORDINATION] {timeline_entry}")
                
            sim.final_outcome = "CONTAINED" if mission_res.overall_risk != "CRITICAL" else "EVACUATING"
            
            event_streaming_engine.publish_event(
                event_type="Mission Completed",
                source="MissionOrchestrator",
                payload={"outcome": sim.final_outcome},
                priority="HIGH",
                mission_id=sim.simulation_id
            )
            
        except Exception as me:
            logger.error(f"ScenarioExecutor: MissionOrchestrator call failed: {me}")
            sim.timeline.append(f"{time.strftime('%H:%M:%S')} - Multi-agent coordination failed: {me}")
            sim.final_outcome = "UNRESOLVED"

        # Progress time step
        simulator.execute_time_step(5)
        
        # Compute final analytics
        heatmap = self.analytics.generate_heatmap(simulator.get_zones())
        
        # 4. Generate structured visualization payload suitable for future frontend rendering
        sim.visualization = {
            "zone_states": [z.model_dump() for z in simulator.get_zones()],
            "crowd_movement": [
                {"from_zone": "food_court", "to_zone": "main_arena", "count_estimate": 250},
                {"from_zone": "gate_entry", "to_zone": "parking_lot", "count_estimate": 150}
            ],
            "risk_heatmap": heatmap,
            "incident_timeline": list(sim.timeline)
        }
        
        sim.performance_metrics = {
            "execution_duration_seconds": time.time() - start_time,
            "total_zones_modeled": len(simulator.get_zones()),
            "overall_occupancy": sum(z.occupancy for z in simulator.get_zones())
        }
        
        event_streaming_engine.publish_event(
            event_type="Simulation Completed",
            source="DigitalTwin",
            payload={"metrics": sim.performance_metrics},
            priority="MEDIUM",
            mission_id=sim.simulation_id
        )
        
        sim.timeline.append(f"{time.strftime('%H:%M:%S')} - Simulation execution finalized")
        logger.info(f"ScenarioExecutor: Simulation '{sim.simulation_id}' completed successfully.")
