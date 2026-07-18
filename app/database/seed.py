import asyncio
from datetime import datetime, timezone
import uuid
from sqlalchemy import select, func
from app.core.config import settings
from app.database.session import SessionLocal, engine
from app.models.enums import UserRole, IncidentStatus, Priority, EventType
from app.models.user import User
from app.models.event import Event
from app.models.incident import Incident
from app.models.agent_log import AgentLog
from loguru import logger

async def seed_data() -> None:
    """
    Populates development database with initial sample users, events,
    incidents, and agent logs if the users table is empty.
    """
    logger.info("Starting development database seeder...")
    async with SessionLocal() as db:
        # Check if users already exist
        stmt = select(func.count()).select_from(User)
        result = await db.execute(stmt)
        user_count = result.scalar() or 0
        
        if user_count > 0:
            logger.info("Database already seeded: records exist. Skipping seeder.")
            return

        logger.info("Database is empty. Seeding mockup datasets...")
        
        # 1. Seed Users
        users = [
            User(
                username="admin_user",
                email="admin@arenaos.ai",
                role=UserRole.ADMIN,
                is_active=True
            ),
            User(
                username="operator_john",
                email="john@arenaos.ai",
                role=UserRole.OPERATOR,
                is_active=True
            ),
            User(
                username="paramedic_sec3",
                email="responder3@arenaos.ai",
                role=UserRole.PARAMEDIC,
                is_active=True
            ),
            User(
                username="security_hq",
                email="security@arenaos.ai",
                role=UserRole.SECURITY,
                is_active=True
            ),
            User(
                username="spectator_guest",
                email="guest@arenaos.ai",
                role=UserRole.SPECTATOR,
                is_active=True
            )
        ]
        db.add_all(users)
        
        # 2. Seed Incidents
        incidents = [
            Incident(
                title="Gate B Congestion",
                description="Heavy crowd build-up at Gate B turnstiles causing 15-minute ingress delays.",
                status=IncidentStatus.ACTIVE,
                priority=Priority.HIGH,
                location="Gate B Entrance"
            ),
            Incident(
                title="Stairwell C Medical Alert",
                description="Spectator collapsed on Stairwell C. Paramedic Unit 3 dispatched.",
                status=IncidentStatus.ACKNOWLEDGED,
                priority=Priority.CRITICAL,
                location="Stairwell C, Sector 4"
            ),
            Incident(
                title="Camera 12 Telemetry Failure",
                description="CCTV feed from turnstile scanner 12 dropped offline.",
                status=IncidentStatus.RESOLVED,
                priority=Priority.LOW,
                location="Concourse Level 1"
            )
        ]
        db.add_all(incidents)
        
        # 3. Seed Events
        events = [
            Event(
                title="Ingress Peak Shift",
                description="System detected ingress load shift towards Gate B entrance.",
                type=EventType.SPECTATOR_FLOW,
                timestamp=datetime.now(timezone.utc)
            ),
            Event(
                title="Manual Security Lockout",
                description="Operator initiated Gate B turnstile emergency override lock.",
                type=EventType.SECURITY_OVERRIDE,
                timestamp=datetime.now(timezone.utc)
            )
        ]
        db.add_all(events)
        
        # 4. Seed Agent Logs
        agent_logs = [
            AgentLog(
                agent_name="IngressOrchestrator",
                log_level="INFO",
                message="Monitoring crowd flow. Dispatched routing adjustment suggestions to Gate B.",
                timestamp=datetime.now(timezone.utc)
            ),
            AgentLog(
                agent_name="SafetyAgent",
                log_level="WARNING",
                message="Medical alert detected in Stairwell C. Initiating responder dispatch telemetry.",
                timestamp=datetime.now(timezone.utc)
            )
        ]
        db.add_all(agent_logs)

        try:
            await db.commit()
            logger.info("Database Seeder completed successfully: Seeding transactions committed.")
        except Exception as e:
            await db.rollback()
            logger.error(f"Database Seeder failed: transaction rolled back due to error: {e}")
            raise e

if __name__ == "__main__":
    # Allow running seeder directly from shell
    asyncio.run(seed_data())
