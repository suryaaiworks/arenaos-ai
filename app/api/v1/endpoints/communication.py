from typing import List
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from app.communication.hub import communication_hub
from app.communication.messages import AgentMessage, MessageType, MessagePriority
from app.communication.subscriptions import AgentSubscription
from loguru import logger

router = APIRouter()

class SendMessageRequest(BaseModel):
    sender: str
    receiver: str
    payload: dict = Field(default_factory=dict)
    message_type: MessageType = Field(default=MessageType.EVENT)
    priority: MessagePriority = Field(default=MessagePriority.MEDIUM)
    ttl: float = Field(default=60.0)


@router.get("/channels", response_model=List[dict])
async def list_communication_channels():
    """
    Lists dynamically configured operation channels.
    """
    logger.info("API: Filtering channels details...")
    channels = communication_hub.registry.list_channels()
    return [c.model_dump() for c in channels]


@router.post("/send", status_code=status.HTTP_200_OK)
async def send_agent_message(req: SendMessageRequest):
    """
    Dispatches and routes message to target recipient inboxes.
    """
    logger.info(f"API: Direct routing message from '{req.sender}' to '{req.receiver}'...")
    try:
        msg = AgentMessage(
            sender=req.sender,
            receiver=req.receiver,
            payload=req.payload,
            message_type=req.message_type,
            priority=req.priority,
            ttl=req.ttl
        )
        delivered = await communication_hub.send_message(msg)
        return {
            "delivered": delivered,
            "message_id": msg.message_id,
            "status": msg.status
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/broadcast", status_code=status.HTTP_200_OK)
async def broadcast_agent_message(req: SendMessageRequest):
    """
    Dispatches notification to all online agent inboxes.
    """
    logger.info(f"API: Broadcasting channel feed message from '{req.sender}'...")
    try:
        msg = AgentMessage(
            sender=req.sender,
            receiver="broadcast",
            payload=req.payload,
            message_type=MessageType.BROADCAST,
            priority=req.priority,
            ttl=req.ttl
        )
        delivered = await communication_hub.broadcast_message(msg)
        return {
            "delivered": delivered,
            "message_id": msg.message_id,
            "status": msg.status
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/subscribe", status_code=status.HTTP_200_OK)
async def subscribe_agent(subscription: AgentSubscription):
    """
    Subscribes agent to target channels, capabilities, or topics.
    """
    logger.info(f"API: Mapping subscription filters for '{subscription.agent_id}'...")
    try:
        # Register subscriber inbox dynamically to avoid KeyErrors
        communication_hub.registry.get_or_create_inbox(subscription.agent_id)
        
        communication_hub.registry.register_subscription(subscription)
        return {"status": "success", "message": f"Agent '{subscription.agent_id}' subscribed successfully."}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/unsubscribe", status_code=status.HTTP_200_OK)
async def unsubscribe_agent(agent_id: str):
    """
    Removes agent subscriber configuration mappings.
    """
    logger.info(f"API: Removing subscription filters for '{agent_id}'...")
    try:
        communication_hub.registry.unregister_subscription(agent_id)
        return {"status": "success", "message": f"Agent '{agent_id}' unsubscribed successfully."}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
