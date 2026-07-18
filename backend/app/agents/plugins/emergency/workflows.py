import time
import json
import uuid
from typing import Any, Dict
from app.agents.plugins.emergency.schemas import EmergencyRespondRequest, EmergencyIncidentReport
from app.agents.plugins.emergency.models import EmergencySeverityLevel
from app.agents.plugins.emergency.prompts import EMERGENCY_SYSTEM_PROMPT, EMERGENCY_REASONING_PROMPT
from app.agents.plugins.emergency.policies import EmergencyEscalationPolicy
from app.agents.plugins.emergency.memory import EmergencyAgentMemoryBridge
from app.agents.plugins.emergency.metrics import emergency_metrics
from app.inference.engine import inference_engine
from app.communication.hub import communication_hub
from app.communication.messages import AgentMessage, MessageType
from loguru import logger

class EmergencyWorkflowRunner:
    """
    Coordinates end-to-end Emergency Response and evacuations coordination workflows.
    Runs validations, memory checks, inference call mappings, tools sandbox execution,
    pubsub event dispatcher updates, and storage updates.
    """
    def __init__(self):
        self.memory_bridge = EmergencyAgentMemoryBridge()
        self.escalation_policy = EmergencyEscalationPolicy()

    async def execute_workflow(self, req: EmergencyRespondRequest) -> EmergencyIncidentReport:
        logger.info(f"EmergencyWorkflow: Starting coordination analysis for session '{req.session_id}'...")
        start_time = time.time()
        success = False

        try:
            # 1. Retrieve session context from Memory Engine
            history_mems = await self.memory_bridge.get_previous_emergency_reports(req.session_id)
            context_data = dict(req.context)
            
            if history_mems:
                context_data["previous_emergency_alerts_count"] = len(history_mems)
                context_data["previous_alerts_recaps"] = [h.content.get("summary", "") for h in history_mems]

            # 2. Query Knowledge Engine for trusted policies & playbooks
            logger.info("EmergencyWorkflow: Retrieving operational guidelines from Knowledge Engine...")
            from app.knowledge.engine import knowledge_engine
            knowledge_res = knowledge_engine.evaluate_policies(
                category="emergency",
                context={
                    "incident": req.incident,
                    "severity": context_data.get("severity", "LOW"),
                    "proximity": context_data.get("proximity", "LOW"),
                    "occupancy_rate": context_data.get("occupancy_rate", 0.0)
                }
            )
            context_data["matched_policies"] = knowledge_res.matched_policies
            context_data["matched_rules"] = knowledge_res.matched_rules
            context_data["playbook_recommendations"] = knowledge_res.recommendations

            # 3. Call InferenceEngine
            logger.info("EmergencyWorkflow: Calling InferenceEngine pipeline...")
            
            capabilities = ["navigation", "incident_management", "notification", "database", "search"]
            
            res = await inference_engine.execute_inference(
                user_prompt=req.incident,
                system_prompt=EMERGENCY_SYSTEM_PROMPT,
                developer_prompt=EMERGENCY_REASONING_PROMPT,
                context=context_data,
                capabilities_required=capabilities
            )

            # 3. Parse and normalize structured report fields
            raw_text = res.text or "{}"
            logger.debug(f"EmergencyWorkflow: Parsing LLM response raw text: {raw_text}")
            
            try:
                start_idx = raw_text.find("{")
                end_idx = raw_text.rfind("}") + 1
                if start_idx != -1 and end_idx != 0:
                    json_str = raw_text[start_idx:end_idx]
                else:
                    json_str = raw_text
                parsed = json.loads(json_str)
            except Exception as pe:
                logger.warning(f"EmergencyWorkflow: JSON parser failed: {pe}. Falling back to default structured template.")
                parsed = {
                    "summary": f"Emergency alarm: {req.incident}",
                    "severity": "INFO",
                    "incident_type": "Fire",
                    "affected_zone": "Food Court",
                    "confidence": 0.8,
                }

            # Map fields safely into Report model
            emergency_id = uuid.uuid4()
            
            sev_str = str(parsed.get("severity", "INFO")).upper()
            severity = EmergencySeverityLevel.INFO
            if sev_str in [s.value for s in EmergencySeverityLevel]:
                severity = EmergencySeverityLevel(sev_str)

            evac = self.escalation_policy.is_evacuation_required(severity)
            receivers = self.escalation_policy.get_notification_receivers(severity)

            # Build timeline list
            timeline = parsed.get("timeline", [])
            if not timeline:
                timeline = [
                    f"{time.strftime('%H:%M')} - Alarm activated: '{req.incident}'",
                    f"{time.strftime('%H:%M')} - Coordinator dispatch loop initiated"
                ]

            report = EmergencyIncidentReport(
                emergency_id=emergency_id,
                incident_type=parsed.get("incident_type", "Fire"),
                severity=severity,
                confidence=float(parsed.get("confidence", 0.85)),
                summary=parsed.get("summary", f"Emergency response summary: {req.incident}"),
                affected_zone=parsed.get("affected_zone", "Zone A"),
                recommended_actions=parsed.get("recommended_actions", ["Establish command post"]),
                evacuation_required=evac,
                medical_required=parsed.get("medical_required", False),
                security_required=parsed.get("security_required", False),
                notify_agents=receivers,
                timeline=timeline,
                memory_updates=parsed.get("memory_updates", {}),
                metadata=parsed.get("metadata", {})
            )

            # 4. Store findings inside Memory Engine
            await self.memory_bridge.save_emergency_report(req.session_id, report.model_dump())

            # 5. Publish inter-agent notification event to CommHub if required
            if receivers:
                for recv in receivers:
                    logger.info(f"EmergencyWorkflow: Directing emergency COMMAND message to receiver agent '{recv}'...")
                    msg = AgentMessage(
                        sender="EmergencyAgent",
                        receiver=recv,
                        payload={
                            "alert": f"Emergency Dispatch Command: {report.summary}",
                            "severity": report.severity.value,
                            "evacuation_required": report.evacuation_required,
                            "emergency_id": str(report.emergency_id)
                        },
                        message_type=MessageType.COMMAND
                    )
                    await communication_hub.send_message(msg)

            success = True
            duration = time.time() - start_time
            emergency_metrics.record_transaction(duration, success)
            return report

        except Exception as e:
            duration = time.time() - start_time
            emergency_metrics.record_transaction(duration, False)
            logger.exception(f"EmergencyWorkflow: Failed executing workflow: {e}")
            raise e
