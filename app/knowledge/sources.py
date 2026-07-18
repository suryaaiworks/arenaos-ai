from typing import List
from app.knowledge.models import OperationalRule, OperationalPolicy

def get_stadium_rules() -> List[OperationalRule]:
    return [
        # 1. Fire SOP Rule
        OperationalRule(
            category="emergency",
            title="Fire Containment Protocol",
            condition="Smoke or fire detected inside stadium",
            action_playbook="Activate fire sprinkler containment systems, dispatch emergency services, and notify control rooms immediately."
        ),
        # 2. Evacuation SOP Rule
        OperationalRule(
            category="emergency",
            title="Zone Evacuation SOP",
            condition="Incident severity classified as CRITICAL",
            action_playbook="Activate zone evacuation alerts. Open emergency exits and guide crowd to assembly points."
        ),
        # 3. Security Access Control Rule
        OperationalRule(
            category="security",
            title="Intrusion & Gate Breach SOP",
            condition="Unauthorized perimeter breach detected",
            action_playbook="Dispatch security response team. Lock down adjacent zones. Capture video feeds."
        ),
        # 4. Crowd Surge Rule
        OperationalRule(
            category="crowd",
            title="Crowd Density Mitigation Rule",
            condition="Zone occupancy rate exceeds 90%",
            action_playbook="Trigger rerouting channels. Announce dynamic pathing guidelines. Assign security control agents."
        ),
        # 5. VIP Protocol Rule
        OperationalRule(
            category="security",
            title="VIP Area Protection Protocol",
            condition="Incident proximity to VIP Area is HIGH",
            action_playbook="Establish secondary perimeter. Dispatch escort units. Coordinate secure transport pathing."
        ),
        # 6. Medical Emergency Rule
        OperationalRule(
            category="emergency",
            title="VIP Medical Response SOP",
            condition="VIP medical emergency or collapse",
            action_playbook="Dispatch nearest medical unit. Secure VIP suites perimeter. Alert Stadium Medical Center."
        ),
        # 7. Lost Child Rule
        OperationalRule(
            category="security",
            title="Lost Child Matching Protocol",
            condition="Lost child report filed",
            action_playbook="Trigger digital banner alerts. Cross-reference entry checkpoint camera logs. Inform exit gate personnel."
        ),
        # 8. Parking SOP Rule
        OperationalRule(
            category="crowd",
            title="Parking Congestion Protocol",
            condition="Parking occupancy rate exceeds 95%",
            action_playbook="Divert approaching vehicles to alternate parking sectors. Update electronic billboard routing directions."
        ),
        # 9. Bomb Threat SOP Rule
        OperationalRule(
            category="emergency",
            title="Bomb Threat SOP",
            condition="Suspicious package or bomb threat reported",
            action_playbook="Initiate controlled evacuation of target sectors. Disengage wireless transmitters. Dispatch bomb squad."
        ),
        # 10. Incident Classification Rule
        OperationalRule(
            category="security",
            title="Threat Level Categorization SOP",
            condition="Incident risk remains unmitigated",
            action_playbook="Escalate threat level status. Activate collaborative multi-agent emergency orchestrators."
        )
    ]


def get_stadium_policies() -> List[OperationalPolicy]:
    return [
        OperationalPolicy(
            scope="emergency",
            title="Emergency Operational Playbooks Guidelines",
            rules=["Fire Containment Protocol", "Zone Evacuation SOP", "VIP Medical Response SOP", "Bomb Threat SOP"]
        ),
        OperationalPolicy(
            scope="security",
            title="Perimeter Security Control Guidelines",
            rules=["Intrusion & Gate Breach SOP", "VIP Area Protection Protocol", "Lost Child Matching Protocol", "Threat Level Categorization SOP"]
        ),
        OperationalPolicy(
            scope="crowd",
            title="Crowd Safety & Rerouting Guidelines",
            rules=["Crowd Density Mitigation Rule", "Parking Congestion Protocol"]
        )
    ]
