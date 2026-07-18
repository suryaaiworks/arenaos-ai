from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_async_db
from app.repositories.user import UserRepository
from app.schemas.user import UserCreate, UserResponse, UserListResponse
from loguru import logger

router = APIRouter()
user_repo = UserRepository()

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    user_in: UserCreate,
    db: AsyncSession = Depends(get_async_db)
):
    """
    Creates a new user.
    Checks for username or email duplicates to prevent constraints violations.
    """
    logger.info(f"API: Request to create user {user_in.username}")
    
    # Check duplicate username
    existing_user = await user_repo.get_by_username(db, user_in.username)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
        
    # Check duplicate email
    existing_email = await user_repo.get_by_email(db, user_in.email)
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
        
    return await user_repo.create(db, user_in)


@router.get("/", response_model=UserListResponse)
async def get_users(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    db: AsyncSession = Depends(get_async_db)
):
    """
    Retrieves a paginated list of active users.
    """
    logger.info(f"API: Requesting users page {page} with size {page_size}")
    total = await user_repo.count(db)
    items = await user_repo.paginate(db, page=page, page_size=page_size)
    
    return {
        "items": items,
        "total": total,
        "page": page,
        "page_size": page_size
    }
