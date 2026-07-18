import datetime
from fastapi import APIRouter
from app.core.config import settings

router = APIRouter()

@router.get("/status", summary="Get Backend Metadata Status")
async def get_status():
    """
    Returns application settings, environment configurations, and server metadata parameters.
    Saves sensitive password tokens via URL redaction rules.
    """
    # Redact credentials from database URL if present
    db_url_redacted = settings.DATABASE_URL
    if "@" in settings.DATABASE_URL:
        # Split username:password part and replace it
        parts = settings.DATABASE_URL.split("@")
        prefix = parts[0].split("//")
        if len(prefix) > 1:
            db_url_redacted = f"{prefix[0]}//****:****@{parts[-1]}"
            
    return {
        "project": settings.PROJECT_NAME,
        "api_version": settings.API_V1_STR,
        "environment": settings.ENVIRONMENT,
        "server_utc_time": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "database_url": db_url_redacted,
        "gemini_api_configured": settings.GEMINI_API_KEY is not None and settings.GEMINI_API_KEY != "your-gemini-api-key-placeholder",
        "redis_configured": settings.REDIS_URL is not None
    }
