import uuid
from fastapi import APIRouter, HTTPException, status
from app.replay.engine import incident_replay_engine
from app.replay.replay_registry import replay_registry
from app.replay.schemas import ReplayStartRequest, ReplayReport
from app.replay.health import ReplayHealthChecker
from loguru import logger

router = APIRouter()
health_checker = ReplayHealthChecker()

@router.post("/start", response_model=ReplayReport, status_code=status.HTTP_201_CREATED)
async def start_replay_session(req: ReplayStartRequest):
    """
    Initializes and starts a step-by-step incident timeline replay.
    """
    logger.info(f"API: Request to start playback for mission '{req.mission_id}'...")
    try:
        return await incident_replay_engine.initiate_replay(req)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/pause", response_model=dict, status_code=status.HTTP_200_OK)
async def pause_replay(replay_id: uuid.UUID):
    """
    Pauses an active playback session.
    """
    logger.info(f"API: Pausing playback session '{replay_id}'...")
    incident_replay_engine.manager.pause_playback(replay_id)
    return {"status": "success", "message": f"Playback '{replay_id}' paused."}


@router.post("/resume", response_model=dict, status_code=status.HTTP_200_OK)
async def resume_replay(replay_id: uuid.UUID):
    """
    Resumes a paused playback session.
    """
    logger.info(f"API: Resuming playback session '{replay_id}'...")
    incident_replay_engine.manager.resume_playback(replay_id)
    return {"status": "success", "message": f"Playback '{replay_id}' resumed."}


@router.get("/history", response_model=list, status_code=status.HTTP_200_OK)
async def get_replay_history():
    """
    Retrieves history logs of compiled playback session records.
    """
    logger.info("API: Querying completed playback session history...")
    replays = replay_registry.list_replays()
    return [r.model_dump() for r in replays.values()]


@router.get("/health", response_model=dict, status_code=status.HTTP_200_OK)
async def get_replay_health():
    """
    Returns diagnostic health and uptime summary parameters for the Replay Engine.
    """
    logger.info("API: Auditing Incident Replay Engine health status...")
    return health_checker.get_health_report()


@router.get("/{mission_id}", response_model=ReplayReport, status_code=status.HTTP_200_OK)
async def get_replay_by_mission(mission_id: uuid.UUID):
    """
    Retrieves the timeline replay logs representing a completed mission.
    """
    logger.info(f"API: Querying playback details for mission '{mission_id}'...")
    rep = replay_registry.get_by_mission(mission_id)
    if not rep:
        # Auto compile a new session to return details immediately
        try:
            req = ReplayStartRequest(mission_id=mission_id)
            rep = await incident_replay_engine.initiate_replay(req)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No mission record history found matching ID: {mission_id}. Error: {e}"
            )
    return rep
