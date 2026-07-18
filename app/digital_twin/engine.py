import time
import uuid
from app.digital_twin.scenario_schemas import SimulationStartRequest, SimulationReport
from app.digital_twin.scenario_registry import simulation_registry
from app.digital_twin.scenario_validator import SimulationValidator
from app.digital_twin.scenario_executor import ScenarioExecutor
from app.digital_twin.scenario_metrics import simulation_metrics
from loguru import logger

class DigitalTwinEngine:
    """
    Facade controller coordinates simulation lifecycles and virtual operations maps.
    """
    def __init__(self):
        self.validator = SimulationValidator()
        self.executor = ScenarioExecutor()

    async def run_simulation(self, req: SimulationStartRequest) -> SimulationReport:
        logger.info(f"DigitalTwinEngine: Run request received for scenario '{req.scenario_name}'...")
        start_time = time.time()
        
        # 1. Validate parameters
        self.validator.validate_request(req)
        
        # 2. Build report payload
        sim_id = uuid.uuid4()
        report = SimulationReport(
            simulation_id=sim_id,
            scenario_name=req.scenario_name,
            timeline=[f"{uuid.uuid4()} - Simulation record initiated"]
        )
        
        # Register in DB
        simulation_registry.register_simulation(report)
        
        try:
            # 3. Dispatch simulated states progression
            await self.executor.execute_simulation(
                sim=report,
                prompt=req.incident_prompt,
                session_id=req.session_id,
                context_dict=req.context
            )
            
            duration = time.time() - start_time
            simulation_metrics.record_simulation(duration)
            return report
            
        except Exception as e:
            logger.exception(f"DigitalTwinEngine: Failed run execution: {e}")
            raise e


# Instantiate engine singleton
digital_twin_engine = DigitalTwinEngine()
