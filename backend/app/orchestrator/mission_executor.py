import time
import uuid
from typing import Any, Dict, List
from app.orchestrator.mission_context import MissionContext
from app.orchestrator.mission_state import MissionState
from app.orchestrator.registry import agent_registry
from app.orchestrator.context import OrchestratorContext
from app.communication.hub import communication_hub
from app.communication.messages import AgentMessage, MessageType
from app.memory.engine import memory_engine
from app.memory.context import MemoryRecord
from loguru import logger

class MissionExecutor:
    """
    Coordinates task dispatches and response aggregation loops across participating agents.
    """
    async def execute_mission(
        self,
        mission: MissionContext,
        incident: str,
        session_id: str,
        context_dict: Dict[str, Any]
    ) -> None:
        logger.info(f"MissionExecutor: Running collaborative task dispatches for mission '{mission.mission_id}'...")
        start_time = time.time()
        
        mission.status = MissionState.RUNNING
        mission.timeline.append(f"{time.strftime('%H:%M')} - Mission execution started")
        
        actions: List[str] = []
        completed: List[str] = []
        pending: List[str] = list(mission.participating_agents)
        highest_risk = "LOW"
        
        for agent_name in list(mission.participating_agents):
            logger.info(f"MissionExecutor: Dispatching sub-task message to agent '{agent_name}'...")
            mission.timeline.append(f"{time.strftime('%H:%M')} - Dispatching task command to {agent_name}")
            
            # 1. Publish command dispatch message through Communication Hub
            msg = AgentMessage(
                sender="MissionOrchestrator",
                receiver=agent_name,
                payload={"task": f"Analyze and respond to stadium incident: {incident}"},
                message_type=MessageType.COMMAND
            )
            await communication_hub.send_message(msg)
            
            # 2. Invoke the agent via registry pipeline
            agent_instance = agent_registry.get_agent(agent_name)
            if not agent_instance:
                logger.warning(f"MissionExecutor: Agent '{agent_name}' is not registered in the system.")
                mission.timeline.append(f"{time.strftime('%H:%M')} - Failed: {agent_name} is unconfigured")
                pending.remove(agent_name)
                continue
                
            # Construct standard OrchestratorContext
            orchestration_ctx = OrchestratorContext(
                request_id=uuid.UUID(session_id) if "-" in session_id else uuid.uuid4(),
                workflow_id=mission.mission_id,
                prompt=incident,
                context=context_dict
            )
            
            try:
                # Execute agent
                res = await agent_instance.execute(orchestration_ctx)
                
                # Check outcome result report
                result_payload = res.result or {}
                mission.agent_results[agent_name] = result_payload
                
                # Extract actions, alerts, risk levels
                risk = result_payload.get("risk_level", "LOW")
                if risk == "CRITICAL" or (risk == "HIGH" and highest_risk != "CRITICAL") or (risk == "MEDIUM" and highest_risk not in ["HIGH", "CRITICAL"]):
                    highest_risk = risk
                    
                actions.extend(result_payload.get("recommended_actions", []))
                
                mission.timeline.append(f"{time.strftime('%H:%M')} - Received structured response from {agent_name} (Risk: {risk})")
                completed.append(agent_name)
            except Exception as ae:
                logger.exception(f"MissionExecutor: Call to agent '{agent_name}' failed: {ae}")
                mission.timeline.append(f"{time.strftime('%H:%M')} - Error calling agent {agent_name}: {str(ae)}")
                
            pending.remove(agent_name)

        # Remove action duplicates
        actions = list(dict.fromkeys(actions))
        if not actions:
            actions = ["Maintain surveillance monitoring on all sectors"]

        # Aggregate unified recommended actions
        mission.overall_risk = highest_risk
        mission.recommended_actions = actions
        mission.completed_tasks = completed
        mission.pending_tasks = pending
        mission.execution_time = time.time() - start_time
        mission.status = MissionState.COMPLETED
        mission.timeline.append(f"{time.strftime('%H:%M')} - Mission completed successfully")
        
        # 3. Store mission report log in Memory Engine
        logger.info("MissionExecutor: Storing unified mission history in Memory Engine...")
        mem_rec = MemoryRecord(
            session_id=str(mission.mission_id),
            memory_type="long_term",
            content=mission.model_dump(),
            metadata={"source": "MissionOrchestrator", "category": "collaboration_audit"}
        )
        await memory_engine.store_memory(mem_rec)
