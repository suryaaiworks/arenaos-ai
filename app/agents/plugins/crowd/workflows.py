import time
import json
import uuid
from typing import Any, Dict
from app.agents.plugins.crowd.schemas import CrowdAnalyzeRequest, CrowdIncidentReport
from app.agents.plugins.crowd.models import CrowdDensityLevel, CrowdRiskLevel
from app.agents.plugins.crowd.prompts import CROWD_SYSTEM_PROMPT, CROWD_REASONING_PROMPT
from app.agents.plugins.crowd.policies import CrowdEscalationPolicy
from app.agents.plugins.crowd.memory import CrowdAgentMemoryBridge
from app.agents.plugins.crowd.metrics import crowd_metrics
from app.inference.engine import inference_engine
from app.communication.hub import communication_hub
from app.communication.messages import AgentMessage, MessageType
from loguru import logger

class CrowdWorkflowRunner:
    """
    Coordinates end-to-end Crowd Intelligence and densities predictions workflows.
    Runs validations, memory checks, inference call mappings, tools sandbox execution,
    pubsub event dispatcher updates, and storage updates.
    """
    def __init__(self):
        self.memory_bridge = CrowdAgentMemoryBridge()
        self.escalation_policy = CrowdEscalationPolicy()

    async def execute_workflow(self, req: CrowdAnalyzeRequest) -> CrowdIncidentReport:
        logger.info(f"CrowdWorkflow: Starting density analysis for session '{req.session_id}'...")
        start_time = time.time()
        success = False

        try:
            # 1. Retrieve session context from Memory Engine
            history_mems = await self.memory_bridge.get_previous_density_reports(req.session_id)
            context_data = dict(req.context)
            
            if history_mems:
                context_data["previous_density_alerts_count"] = len(history_mems)
                context_data["previous_alerts_recaps"] = [h.content.get("summary", "") for h in history_mems]

            # 2. Query Knowledge Engine for trusted policies & playbooks
            logger.info("CrowdWorkflow: Retrieving operational guidelines from Knowledge Engine...")
            from app.knowledge.engine import knowledge_engine
            knowledge_res = knowledge_engine.evaluate_policies(
                category="crowd",
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
            logger.info("CrowdWorkflow: Calling InferenceEngine pipeline...")
            
            capabilities = ["analytics", "navigation", "incident_management", "notification", "database", "search"]
            
            res = await inference_engine.execute_inference(
                user_prompt=req.incident,
                system_prompt=CROWD_SYSTEM_PROMPT,
                developer_prompt=CROWD_REASONING_PROMPT,
                context=context_data,
                capabilities_required=capabilities
            )

            # 3. Parse and normalize structured report fields
            raw_text = res.text or "{}"
            logger.debug(f"CrowdWorkflow: Parsing LLM response raw text: {raw_text}")
            
            try:
                start_idx = raw_text.find("{")
                end_idx = raw_text.rfind("}") + 1
                if start_idx != -1 and end_idx != 0:
                    json_str = raw_text[start_idx:end_idx]
                else:
                    json_str = raw_text
                parsed = json.loads(json_str)
            except Exception as pe:
                logger.warning(f"CrowdWorkflow: JSON parser failed: {pe}. Falling back to default structured template.")
                parsed = {
                    "summary": f"Crowd density surveillance: {req.incident}",
                    "density_level": "LOW",
                    "risk_level": "LOW",
                    "estimated_people": 250,
                    "confidence": 0.8,
                }

            # Map fields safely into Report model
            analysis_id = uuid.uuid4()
            
            density_str = str(parsed.get("density_level", "LOW")).upper()
            density_level = CrowdDensityLevel.LOW
            if density_str in [d.value for d in CrowdDensityLevel]:
                density_level = CrowdDensityLevel(density_str)
                
            risk_str = str(parsed.get("risk_level", "LOW")).upper()
            risk_level = CrowdRiskLevel.LOW
            if risk_str in [r.value for r in CrowdRiskLevel]:
                risk_level = CrowdRiskLevel(risk_str)

            rerouting = self.escalation_policy.is_rerouting_required(risk_level)
            receivers = self.escalation_policy.get_notification_receivers(risk_level)

            report = CrowdIncidentReport(
                analysis_id=analysis_id,
                crowd_zone=parsed.get("crowd_zone", "Zone A"),
                density_level=density_level,
                estimated_people=int(parsed.get("estimated_people", 250)),
                risk_level=risk_level,
                confidence=float(parsed.get("confidence", 0.85)),
                summary=parsed.get("summary", f"Crowd traffic summary: {req.incident}"),
                predicted_behavior=parsed.get("predicted_behavior", "Normal flow"),
                recommended_actions=parsed.get("recommended_actions", ["Monitor sector gates"]),
                rerouting_required=rerouting,
                notify_agents=receivers,
                memory_updates=parsed.get("memory_updates", {}),
                metadata=parsed.get("metadata", {})
            )

            # 4. Store findings inside Memory Engine
            await self.memory_bridge.save_crowd_report(req.session_id, report.model_dump())

            # 5. Publish inter-agent notification event to CommHub if required (e.g. notify Security Agent)
            if receivers:
                for recv in receivers:
                    logger.info(f"CrowdWorkflow: Notifying receiver agent '{recv}' of crowd density alerts...")
                    msg = AgentMessage(
                        sender="CrowdAgent",
                        receiver=recv,
                        payload={
                            "alert": f"Crowd Risk Alert: {report.summary}",
                            "density_level": report.density_level.value,
                            "risk_level": report.risk_level.value,
                            "analysis_id": str(report.analysis_id)
                        },
                        message_type=MessageType.NOTIFICATION
                    )
                    await communication_hub.send_message(msg)

            success = True
            duration = time.time() - start_time
            crowd_metrics.record_transaction(duration, success)
            return report

        except Exception as e:
            duration = time.time() - start_time
            crowd_metrics.record_transaction(duration, False)
            logger.exception(f"CrowdWorkflow: Failed executing workflow: {e}")
            raise e
