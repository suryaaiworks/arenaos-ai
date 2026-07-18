from typing import Any, Dict, List

class ReplayAnalytics:
    """
    Analyzes historical records to compile summarizing metadata narratives.
    """
    def summarize_decisions(self, results_dict: Dict[str, Any]) -> str:
        if not results_dict:
            return "No decisions were required. The incident was contained by standard automated surveillance."
            
        summary_sentences = []
        for agent_name, payload in results_dict.items():
            sum_text = payload.get("summary", "analysis complete")
            summary_sentences.append(f"Agent '{agent_name}' evaluated threat and reported: '{sum_text}'.")
            
        return " ".join(summary_sentences)

    def summarize_communication(self, results_dict: Dict[str, Any]) -> str:
        agent_count = len(results_dict)
        return f"A total of {agent_count} agent communication channels were established and monitored."
