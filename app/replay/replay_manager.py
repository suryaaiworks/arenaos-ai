import uuid
from app.replay.schemas import ReplayStartRequest, ReplayReport
from app.replay.models import ReplayState
from app.replay.replay_registry import replay_registry
from app.replay.history_loader import ReplayHistoryLoader
from app.replay.timeline_builder import TimelineBuilder
from app.replay.analytics import ReplayAnalytics
from app.replay.decision_graph import DecisionGraphBuilder
from app.replay.replay_executor import ReplayExecutor
from loguru import logger

class ReplayManager:
    """
    Coordinates playback transitions and compiles narrative summaries.
    """
    def __init__(self):
        self.loader = ReplayHistoryLoader()
        self.builder = TimelineBuilder()
        self.analytics = ReplayAnalytics()
        self.graph_builder = DecisionGraphBuilder()
        self.executor = ReplayExecutor()

    async def create_replay_session(self, req: ReplayStartRequest) -> ReplayReport:
        logger.info(f"ReplayManager: Initiating playback session for mission '{req.mission_id}'...")
        
        # 1. Load context and events logs
        ctx_dict = await self.loader.load_mission_context(req.mission_id)
        stream_events = self.loader.load_stream_events(req.mission_id)
        
        # 2. Build sorted timeline
        timeline_obj = self.builder.build_chronological_sequence(ctx_dict, stream_events)
        
        # 3. Compile narrative summaries and graphs
        agents = list(ctx_dict.get("participating_agents", []))
        decision_sum = self.analytics.summarize_decisions(ctx_dict.get("agent_results", {}))
        comm_sum = self.analytics.summarize_communication(ctx_dict.get("agent_results", {}))
        
        graph = self.graph_builder.build_decision_graph(agents)
        
        replay_id = uuid.uuid4()
        report = ReplayReport(
            replay_id=replay_id,
            mission_id=req.mission_id,
            status=ReplayState.STOPPED,
            speed=req.speed,
            timeline=[d["description"] for d in timeline_obj.get_events()],
            events=timeline_obj.get_events(),
            participating_agents=agents,
            tool_usage=list(ctx_dict.get("completed_tasks", [])),
            decision_summary=decision_sum,
            communication_summary=comm_sum,
            duration=float(ctx_dict.get("execution_time", 0.0)),
            metadata={"decision_graph": graph}
        )
        
        replay_registry.register_replay(report)
        return report

    def start_playback(self, replay_id: uuid.UUID) -> None:
        rep = replay_registry.get_replay(replay_id)
        if rep:
            self.executor.start_playback(rep, rep.events)

    def pause_playback(self, replay_id: uuid.UUID) -> None:
        rep = replay_registry.get_replay(replay_id)
        if rep:
            rep.status = ReplayState.PAUSED
            self.executor.pause_playback(replay_id)

    def resume_playback(self, replay_id: uuid.UUID) -> None:
        rep = replay_registry.get_replay(replay_id)
        if rep:
            rep.status = ReplayState.PLAYING
            self.executor.start_playback(rep, rep.events)
