import uuid
from datetime import datetime, timezone
from typing import Any, Generic, List, Type, TypeVar
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.common import CommonBase
from loguru import logger

ModelType = TypeVar("ModelType", bound=CommonBase)
CreateSchemaType = TypeVar("CreateSchemaType")
UpdateSchemaType = TypeVar("UpdateSchemaType")

class BaseRepository(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    """
    Generic Base Repository implementing standard async CRUD, soft delete, pagination,
    counting, filtering, and transaction commit/rollback logs.
    """
    def __init__(self, model: Type[ModelType]):
        self.model = model

    async def get_by_id(self, db: AsyncSession, id: uuid.UUID) -> ModelType | None:
        logger.debug(f"Repo [{self.model.__name__}]: Fetching by ID {id}")
        query = select(self.model).where(self.model.id == id, self.model.is_deleted == False)
        result = await db.execute(query)
        return result.scalar_one_or_none()

    async def get_all(self, db: AsyncSession) -> List[ModelType]:
        logger.debug(f"Repo [{self.model.__name__}]: Fetching all active records")
        query = select(self.model).where(self.model.is_deleted == False)
        result = await db.execute(query)
        return list(result.scalars().all())

    async def count(self, db: AsyncSession) -> int:
        logger.debug(f"Repo [{self.model.__name__}]: Counting active records")
        query = select(func.count()).select_from(self.model).where(self.model.is_deleted == False)
        result = await db.execute(query)
        return result.scalar() or 0

    async def exists(self, db: AsyncSession, id: uuid.UUID) -> bool:
        logger.debug(f"Repo [{self.model.__name__}]: Checking existence of ID {id}")
        query = select(self.model.id).where(self.model.id == id, self.model.is_deleted == False)
        result = await db.execute(query)
        return result.scalar() is not None

    async def create(self, db: AsyncSession, obj_in: CreateSchemaType) -> ModelType:
        logger.info(f"Repo [{self.model.__name__}]: Creating new record")
        obj_data = obj_in.model_dump()
        db_obj = self.model(**obj_data)
        db.add(db_obj)
        try:
            await db.commit()
            logger.debug(f"Repo [{self.model.__name__}]: Transaction committed successfully")
            await db.refresh(db_obj)
            return db_obj
        except Exception as e:
            await db.rollback()
            logger.error(f"Repo [{self.model.__name__}]: Transaction rolled back due to creation error: {e}")
            raise e

    async def update(self, db: AsyncSession, db_obj: ModelType, obj_in: UpdateSchemaType) -> ModelType:
        logger.info(f"Repo [{self.model.__name__}]: Updating record {db_obj.id}")
        update_data = obj_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        db_obj.updated_at = datetime.now(timezone.utc)
        db.add(db_obj)
        try:
            await db.commit()
            logger.debug(f"Repo [{self.model.__name__}]: Transaction committed successfully")
            await db.refresh(db_obj)
            return db_obj
        except Exception as e:
            await db.rollback()
            logger.error(f"Repo [{self.model.__name__}]: Transaction rolled back due to update error: {e}")
            raise e

    async def delete(self, db: AsyncSession, id: uuid.UUID) -> bool:
        logger.warning(f"Repo [{self.model.__name__}]: Soft-deleting record {id}")
        db_obj = await self.get_by_id(db, id)
        if not db_obj:
            logger.debug(f"Repo [{self.model.__name__}]: Delete aborted - ID {id} not found")
            return False
        db_obj.is_deleted = True
        db_obj.deleted_at = datetime.now(timezone.utc)
        db.add(db_obj)
        try:
            await db.commit()
            logger.debug(f"Repo [{self.model.__name__}]: Transaction committed successfully")
            return True
        except Exception as e:
            await db.rollback()
            logger.error(f"Repo [{self.model.__name__}]: Transaction rolled back due to delete error: {e}")
            raise e

    async def paginate(self, db: AsyncSession, page: int = 1, page_size: int = 20) -> List[ModelType]:
        logger.debug(f"Repo [{self.model.__name__}]: Paginate (page {page}, size {page_size})")
        offset = (page - 1) * page_size
        query = select(self.model).where(self.model.is_deleted == False).offset(offset).limit(page_size)
        result = await db.execute(query)
        return list(result.scalars().all())

    async def filter(self, db: AsyncSession, page: int = 1, page_size: int = 20, **filters) -> List[ModelType]:
        logger.debug(f"Repo [{self.model.__name__}]: Filtering records by {filters} (page {page}, size {page_size})")
        offset = (page - 1) * page_size
        query = select(self.model).where(self.model.is_deleted == False)
        for attr, value in filters.items():
            if hasattr(self.model, attr) and value is not None:
                query = query.where(getattr(self.model, attr) == value)
        query = query.offset(offset).limit(page_size)
        result = await db.execute(query)
        return list(result.scalars().all())
