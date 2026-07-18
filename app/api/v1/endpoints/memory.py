from typing import Any, Dict, List, Optional
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from app.memory.engine import memory_engine
from app.memory.context import MemoryRecord
from loguru import logger

router = APIRouter()

class MemoryStoreRequest(BaseModel):
    session_id: str
    memory_type: str = Field(default="short_term")
    content: dict = Field(default_factory=dict)
    metadata: dict = Field(default_factory=dict)


class MemoryRetrieveRequest(BaseModel):
    session_id: str
    memory_type: str = Field(default="short_term")


class MemorySearchRequest(BaseModel):
    session_id: str
    query: str
    limit: int = Field(default=5)


@router.get("/sessions", response_model=List[str])
async def get_active_sessions():
    """
    Lists unique session IDs indexed in MemoryEngine.
    """
    logger.info("API: Fetching active session lists...")
    return await memory_engine.sessions.list_active_sessions()


@router.get("/history/{session_id}", response_model=List[dict])
async def get_session_history(session_id: str):
    """
    Retrieves complete message sequence turn history for session.
    """
    logger.info(f"API: Retrieving turns history for session '{session_id}'...")
    return await memory_engine.conversations.get_history(session_id)


@router.post("/store", status_code=status.HTTP_201_CREATED)
async def store_memory_item(req: MemoryStoreRequest):
    """
    Pushes record to ShortTerm/LongTerm/Conversation registers.
    """
    logger.info(f"API: Storing record of type '{req.memory_type}' for session '{req.session_id}'...")
    try:
        record = MemoryRecord(
            session_id=req.session_id,
            memory_type=req.memory_type,
            content=req.content,
            metadata=req.metadata
        )
        
        # Make sure session registers is indexed
        await memory_engine.sessions.register_session(req.session_id)
        
        await memory_engine.store_memory(record)
        return {"status": "success", "message": "Memory stored successfully."}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/retrieve", response_model=List[MemoryRecord])
async def retrieve_memories(req: MemoryRetrieveRequest):
    """
    Pulls lists of records filtered by type.
    """
    logger.info(f"API: Retrieving records list for session '{req.session_id}'...")
    try:
        return await memory_engine.retrieve_memories(
            session_id=req.session_id,
            memory_type=req.memory_type
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/search", response_model=List[MemoryRecord])
async def search_memories(req: MemorySearchRequest):
    """
    Performs keyword matching query and ranks outcomes by relevance.
    """
    logger.info(f"API: Relevance searching context query '{req.query}'...")
    try:
        return await memory_engine.search_memories(
            session_id=req.session_id,
            query=req.query,
            limit=req.limit
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/clear")
async def clear_session_context(session_id: str):
    """
    Clears all database turns and lists caches for the session.
    """
    logger.info(f"API: Flushed session context storage for '{session_id}'...")
    try:
        await memory_engine.clear_session(session_id)
        return {"status": "success", "message": f"Session '{session_id}' memory cleared."}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
