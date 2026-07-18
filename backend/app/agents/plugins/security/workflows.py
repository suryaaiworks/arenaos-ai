import time
import json
import uuid
from typing import Any, Dict
from app.agents.plugins.security.schemas import SecurityAnalyzeRequest, SecurityIncidentReport
from app.agents.plugins.security.models import SecurityIncidentType, SecurityRiskLevel
from app.agents.plugins.security.prompts import SECURITY_SYSTEM_PROMPT, SECURITY_REASONING_PROMPT
from app.agents.plugins.security.policies import SecurityEscalationPolicy
from app.agents.plugins.security.memory import SecurityAgentMemoryBridge
from app.agents.plugins.security.metrics import security_metrics
from app.inference.engine import inference_engine
from app.communication.hub import communication_hub
from app.communication.messages import AgentMessage, MessageType
from loguru import logger

class SecurityWorkflowRunner:
    """
    Coordinates end-to-end security surveillance and threat containing workflows.
    Runs validations, memory checks, inference call mappings, tools sandbox execution,
    pubsub event dispatcher updates, and storage updates.
    """
    def __init__(self):
        self.memory_bridge = SecurityAgentMemoryBridge()
        self.escalation_policy = SecurityEscalationPolicy()

    async def execute_workflow(self, req: SecurityAnalyzeRequest) -> SecurityIncidentReport:
        logger.info(f"SecurityWorkflow: Starting surveillance analysis for session '{req.session_id}'...")
        start_time = time.time()
        success = False

        try:
            # 1. Retrieve session context from Memory Engine
            history_mems = await self.memory_bridge.get_previous_incidents(req.session_id)
            context_data = dict(req.context)
            
            # Map previous incidents recap text if available
            if history_mems:
                context_data["previous_session_alerts_count"] = len(history_mems)
                context_data["previous_alerts_recaps"] = [h.content.get("summary", "") for h in history_mems]

            # 2. Build prompt and run via InferenceEngine
            logger.info("SecurityWorkflow: Calling InferenceEngine pipeline...")
            
            # Request tool capabilities matching our needs
            capabilities = ["weather", "database", "incident_management", "navigation", "notification"]
            
            res = await inference_engine.execute_inference(
                user_prompt=req.incident,
                system_prompt=SECURITY_SYSTEM_PROMPT,
                developer_prompt=SECURITY_REASONING_PROMPT,
                context=context_data,
                capabilities_required=capabilities
            )

            # 3. Parse and normalize structured report fields
            raw_text = res.text or "{}"
            logger.debug(f"SecurityWorkflow: Parsing LLM response raw text: {raw_text}")
            
            # Safe JSON extraction helper
            try:
                # Find bounding braces in case model outputs surrounding markdown blocks
                start_idx = raw_text.find("{")
                end_idx = raw_text.rfind("}") + 1
                if start_idx != -1 and end_idx != 0:
                    json_str = raw_text[start_idx:end_idx]
                else:
                    json_str = raw_text
                parsed = json.loads(json_str)
            except Exception as pe:
                logger.warning(f"SecurityWorkflow: JSON parser failed: {pe}. Falling back to default structured template.")
                parsed = {
                    "summary": f"Incident surveillance report: {req.incident}",
                    "risk_level": "LOW",
                    "incident_type": "Unknown incident",
                    "confidence": 0.7,
                }

            # Map fields safely into Report model
            inc_id = uuid.uuid4()
            risk_str = str(parsed.get("risk_level", "LOW")).upper()
            risk_level = SecurityRiskLevel.LOW
            if risk_str in [r.value for r in SecurityRiskLevel]:
                risk_level = SecurityRiskLevel(risk_str)
                
            inc_str = parsed.get("incident_type", "Unknown incident")
            # Loose string matching to map to Enum
            incident_type = SecurityIncidentType.UNKNOWN
            for it in SecurityIncidentType:
                if it.value.lower() in inc_str.lower() or inc_str.lower() in it.value.lower():
                    incident_type = it
                    break

            # 4. Apply escalation policies
            escalate = self.escalation_policy.is_escalation_required(risk_level)
            receivers = self.escalation_policy.get_notification_receivers(risk_level)

            report = SecurityIncidentReport(
                incident_id=inc_id,
                incident_type=incident_type,
                risk_level=risk_level,
                confidence=float(parsed.get("confidence", 0.85)),
                summary=parsed.get("summary", f"Surveillance alert: {req.incident}"),
                recommended_actions=parsed.get("recommended_actions", ["Monitor sector cameras"]),
                required_tools=parsed.get("required_tools", ["SearchTool"]),
                escalation_required=escalate,
                notify_agents=receivers,
                memory_updates=parsed.get("memory_updates", {}),
                metadata=parsed.get("metadata", {})
            )

            # 5. Store findings inside Memory Engine
            await self.memory_bridge.save_incident_report(req.session_id, report.model_dump())

            # 6. Publish inter-agent notification event to CommHub if required
            if escalate and receivers:
                for recv in receivers:
                    logger.info(f"SecurityWorkflow: Escalating command alert payload to receiver agent '{recv}'...")
                    msg = AgentMessage(
                        sender="SecurityAgent",
                        receiver=recv,
                        payload={
                            "alert": f"Security Alert Escalated: {report.summary}",
                            "risk_level": report.risk_level.value,
                            "incident_type": report.incident_type.value,
                            "incident_id": str(report.incident_id)
                        },
                        message_type=MessageType.COMMAND
                    )
                    await communication_hub.send_message(msg)

            success = True
            duration = time.time() - start_time
            security_metrics.record_transaction(duration, success)
            return report

        except Exception as e:
            duration = time.time() - start_time
            security_metrics.record_transaction(duration, False)
            logger.exception(f"SecurityWorkflow: Failed executing workflow: {e}")
            raise e
