import time
from typing import Any, Dict, List, Optional
from app.memory.storage import InMemoryStorage, MemoryStorageInterface
from app.memory.context import MemoryRecord
from app.memory.short_term import ShortTermMemoryAdapter
from app.memory.long_term import LongTermMemoryAdapter
from app.memory.session import SessionMemoryAdapter
from app.memory.conversation import ConversationMemoryAdapter
from app.memory.workflow import WorkflowMemoryAdapter
from app.memory.execution import ExecutionMemoryAdapter
from app.memory.retrieval import MemoryRetrievalSystem
from app.memory.summarizer import MockSummarizer
from app.memory.metrics import memory_metrics
from app.memory.policies import MemoryPolicies
from loguru import logger

class MemoryEngine:
    """
    Central Coordinator managing short/long term context, conversation sequence histories,
    summarisation triggers, and abstract storage adapters routing.
    """
    def __init__(self, storage: Optional[MemoryStorageInterface] = None):
        self.storage = storage or InMemoryStorage()
        self.short_term = ShortTermMemoryAdapter(self.storage)
        self.long_term = LongTermMemoryAdapter(self.storage)
        self.sessions = SessionMemoryAdapter(self.storage)
        self.conversations = ConversationMemoryAdapter(self.storage)
        self.workflows = WorkflowMemoryAdapter(self.storage)
        self.executions = ExecutionMemoryAdapter(self.storage)
        
        self.retrieval_system = MemoryRetrievalSystem()
        self.summarizer = MockSummarizer()
        self.policies = MemoryPolicies()

    async def store_memory(self, record: MemoryRecord) -> None:
        """
        Routes and stores the memory record based on its memory_type definition.
        """
        logger.info(f"MemoryEngine: Request to store memory record of type '{record.memory_type}'...")
        start_time = time.time()
        
        # Route storage writes
        if record.memory_type == "short_term":
            await self.short_term.store_memory(record)
            await self.short_term.add_to_session(record.session_id, record)
        elif record.memory_type == "long_term":
            await self.long_term.store_memory(record)
            await self.long_term.add_to_session(record.session_id, record)
        elif record.memory_type == "conversation":
            await self.conversations.add_message(record.session_id, record.content)
            
            # Apply compression policy check if turns count exceed limit
            history = await self.conversations.get_history(record.session_id)
            if len(history) >= self.policies.compression.compression_threshold_turns:
                logger.info("MemoryEngine: History size threshold exceeded. Triggering summariser compression...")
                compressed = await self.summarizer.compress_history(history)
                # Overwrite history register with compressed representation
                key = f"conversation_history:{record.session_id}"
                await self.storage.set(key, compressed)
                memory_metrics.record_compression()
        else:
            # Fallback direct key storage
            key = f"generic_mem:{record.session_id}:{record.memory_id}"
            await self.storage.set(key, record.model_dump())

        # Update telemetry metrics
        memory_metrics.record_write()
        active_sess = await self.sessions.list_active_sessions()
        memory_metrics.set_active_sessions(len(active_sess))
        
        logger.info(f"MemoryEngine: Stored memory record successfully in {time.time() - start_time:.4f}s")

    async def retrieve_memories(self, session_id: str, memory_type: str = "short_term") -> List[MemoryRecord]:
        """
        Retrieves all stored records of the target type.
        """
        logger.info(f"MemoryEngine: Retrieving records for session '{session_id}' of type '{memory_type}'...")
        start_time = time.time()
        
        records = []
        if memory_type == "short_term":
            records = await self.short_term.retrieve_memories(session_id)
        elif memory_type == "long_term":
            records = await self.long_term.retrieve_memories(session_id)
        elif memory_type == "conversation":
            turns = await self.conversations.get_history(session_id)
            records = [
                MemoryRecord(
                    session_id=session_id,
                    memory_type="conversation",
                    content=turn
                ) for turn in turns
            ]

        latency = time.time() - start_time
        memory_metrics.record_access(hit=len(records) > 0, latency=latency)
        
        logger.info(f"MemoryEngine: Retrieved {len(records)} memories.")
        return records

    async def search_memories(self, session_id: str, query: str, limit: int = 5) -> List[MemoryRecord]:
        """
        Retrieves both short and long term memories and ranks them matching query terms.
        """
        logger.info(f"MemoryEngine: Querying ranked search matches for query '{query}'...")
        start_time = time.time()
        
        # Pull candidate records from both transient and persistent registers
        st = await self.short_term.retrieve_memories(session_id)
        lt = await self.long_term.retrieve_memories(session_id)
        
        candidates = st + lt
        ranked = await self.retrieval_system.search_and_rank(query, candidates, limit)
        
        latency = time.time() - start_time
        memory_metrics.record_access(hit=len(ranked) > 0, latency=latency)
        return ranked

    async def clear_session(self, session_id: str) -> None:
        logger.info(f"MemoryEngine: Flushing all states for session '{session_id}'...")
        await self.conversations.clear_history(session_id)
        # Clear specific session lists
        await self.storage.delete(f"short_term:list:{session_id}")
        await self.storage.delete(f"long_term:list:{session_id}")
        
        # Remove from active sessions index
        active = await self.sessions.list_active_sessions()
        if session_id in active:
            active.remove(session_id)
            await self.storage.set("active_session_ids", active)


# Instantiate MemoryEngine singleton
memory_engine = MemoryEngine()
