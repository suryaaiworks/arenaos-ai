from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger

from app.core.config import settings
from app.core.logging import setup_logging
from app.middleware.logging import RequestLoggingMiddleware
from app.api.v1.router import api_router
from app.database.init_db import init_db
from app.database.session import check_db_health

from app.agents.manager.agent_manager import agent_manager
from app.providers.manager.provider_manager import provider_manager
from app.toolkit.registry.discovery import ToolDiscovery

# Initialize structured logging sinks
setup_logging()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    FastAPI Lifespan Context Manager.
    Handles startup database connections and shutdown connection closures.
    """
    logger.info("Starting up ArenaOS AI FastAPI Backend...")
    
    # Initialize tables schemas in development SQLite database
    if settings.ENVIRONMENT == "development":
        await init_db()
        
    # Trigger auto-discovery scans of agent plugins directory
    agent_manager.discover_agents()
    
    # Trigger auto-discovery scans of tools plugins directory
    ToolDiscovery().discover_and_load_tools()
    
    # Initialize model provider configuration objects
    await provider_manager.initialize_providers()
        
    yield
    
    logger.info("Shutting down ArenaOS AI FastAPI Backend...")


# Initialize FastAPI instance
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Enterprise Clean Architecture API backend powering ArenaOS AI Smart Stadium operations.",
    version="1.0.0-backend",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Register CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Request Latency Logging middleware
app.add_middleware(RequestLoggingMiddleware)

# Include Centralized router
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/", summary="Root Endpoint", tags=["Root"])
async def read_root():
    """
    Returns basic platform identity metadata.
    """
    return {
        "project": "ArenaOS AI",
        "status": "running",
        "version": "1.0.0-backend"
    }


@app.get("/health", summary="Health Check Status", tags=["Root"])
async def health_check():
    """
    Performs basic database engine dial audits and reports platform wellness status.
    """
    health_data = await check_db_health()
    return {
        "status": health_data["status"],
        "database": health_data["database"],
        "latency_ms": health_data["latency_ms"],
        "services": "ready"
    }
