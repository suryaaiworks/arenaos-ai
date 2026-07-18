import uuid
from typing import Any, Dict, List
from pydantic import BaseModel, Field
from app.digital_twin.scenario_models import SimulationType

class SimulationStartRequest(BaseModel):
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    scenario_name: str = Field(..., description="E.g., Fire in Food Court, Heavy Rain Evacuation")
    incident_prompt: str = Field(..., description="Prompt detailing hypothetical scenario description")
    context: Dict[str, Any] = Field(default_factory=dict)


class SimulationRunRequest(BaseModel):
    simulation_id: uuid.UUID
    time_step_minutes: int = Field(default=5)


class SimulationReport(BaseModel):
    """
    Standardized report summarizing virtual representation outcomes and predictions.
    """
    simulation_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    scenario_name: str
    affected_zones: List[str] = Field(default_factory=list)
    participating_agents: List[str] = Field(default_factory=list)
    timeline: List[str] = Field(default_factory=list)
    risk_progression: List[Dict[str, Any]] = Field(default_factory=list, description="Sequence tracking risk level changes over steps")
    agent_decisions: Dict[str, Any] = Field(default_factory=dict)
    recommended_actions: List[str] = Field(default_factory=list)
    final_outcome: str = Field(default="STABLE")
    performance_metrics: Dict[str, Any] = Field(default_factory=dict)
    
    # VISUALIZATION DATA (Frontend Ready JSON structure)
    visualization: Dict[str, Any] = Field(
        default_factory=dict,
        description="Structured JSON specifying Zone states, crowd movements maps, heatmap coordinates."
    )
    metadata: Dict[str, Any] = Field(default_factory=dict)
class SimulationSimulateRequest(BaseModel):
    incident: str = Field(..., description="Raw text describing simulation scenario")
