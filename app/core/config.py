import os
from typing import Optional
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """
    Centralized Settings manager for ArenaOS AI.
    Loads variables dynamically from environment or .env file.
    """
    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), ".env"),
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

    PROJECT_NAME: str = Field(default="ArenaOS AI")
    API_V1_STR: str = Field(default="/api/v1")
    ENVIRONMENT: str = Field(default="development")

    # Database Settings (Supabase PostgreSQL asyncpg driver by default)
    DATABASE_URL: str = Field(
        default="postgresql+asyncpg://postgres:postgres@localhost:54322/postgres"
    )

    # Supabase API Configurations
    SUPABASE_URL: Optional[str] = Field(default=None)
    SUPABASE_ANON_KEY: Optional[str] = Field(default=None)
    SUPABASE_SERVICE_ROLE_KEY: Optional[str] = Field(default=None)

    # Gemini AI integration configuration placeholders
    GEMINI_API_KEY: Optional[str] = Field(default=None)

    # Redis configuration placeholders for dynamic telemetry sync
    REDIS_URL: Optional[str] = Field(default=None)


# Instantiate settings singleton
settings = Settings()
