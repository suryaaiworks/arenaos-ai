import asyncio
import json
from fastapi import APIRouter, HTTPException, status
from fastapi.responses import StreamingResponse
from app.streaming.engine import event_streaming_engine
from app.streaming.event_schemas import EventPublishRequest
from app.streaming.health import StreamingEngineHealth
from loguru import logger

router = APIRouter()
health_checker = StreamingEngineHealth()

@router.get("/history", response_model=list, status_code=status.HTTP_200_OK)
async def get_recent_events_history():
    """
    Retrieves recent buffered events enabling replay logic.
    """
    logger.info("API: Querying recent event history buffer logs...")
    recent = event_streaming_engine.get_event_history()
    return [e.model_dump() for e in recent]


@router.post("/publish", response_model=dict, status_code=status.HTTP_201_CREATED)
async def publish_custom_event(req: EventPublishRequest):
    """
    Publishes a custom event packet to the streaming engine.
    """
    logger.info(f"API: Publishing manual custom event '{req.event_type}'...")
    try:
        event = event_streaming_engine.publish_event(
            event_type=req.event_type,
            source=req.source,
            payload=req.payload,
            priority=req.priority,
            correlation_id=req.correlation_id,
            mission_id=req.mission_id,
            metadata=req.metadata
        )
        return {
            "status": "success",
            "event_id": str(event.event_id),
            "message": "Event published successfully."
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get("/health", response_model=dict, status_code=status.HTTP_200_OK)
async def get_streaming_health():
    """
    Returns diagnostic health and uptime summary parameters for the Event Streaming Engine.
    """
    logger.info("API: Auditing Event Streaming Engine health status...")
    return health_checker.get_health_report()


@router.get("/stream")
async def stream_live_events():
    """
    Server-Sent Events (SSE) stream yielding system event packets.
    """
    logger.info("API: Establishing SSE events stream subscription...")
    
    async def sse_generator():
        # Setup local queue
        queue = asyncio.Queue()
        
        # We can poll history or register a temporary callback.
        # But a simple polling listener check on event_streaming_engine.history.get_recent()
        # works cleanly for offline testing.
        # Let's yield buffered logs and poll every 2 seconds for new updates.
        last_index = 0
        while True:
            history = event_streaming_engine.get_event_history()
            if len(history) > last_index:
                for event in history[last_index:]:
                    data = json.dumps(event.model_dump(), default=str)
                    yield f"data: {data}\n\n"
                last_index = len(history)
            await asyncio.sleep(1)

    return StreamingResponse(sse_generator(), media_type="text/event-stream")
