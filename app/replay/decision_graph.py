from typing import Any, Dict, List

class DecisionGraphBuilder:
    """
    Builds directed graph coordinates mapping multi-agent collaborations flows.
    """
    def build_decision_graph(self, participating_agents: List[str]) -> Dict[str, Any]:
        nodes = [{"id": "Orchestrator", "label": "MissionOrchestrator", "type": "mediator"}]
        edges = []
        
        # Connect participating agents to the central orchestrator mediator
        for agent in participating_agents:
            nodes.append({
                "id": agent,
                "label": f"{agent.capitalize()}Agent",
                "type": "agent"
            })
            edges.append({
                "from": "Orchestrator",
                "to": agent,
                "relationship": "coordinate"
            })
            
        return {
            "nodes": nodes,
            "edges": edges,
            "description": "Directed agent collaboration network graph"
        }
