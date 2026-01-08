from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from base.base import Base
from core.config import settings

engine = create_async_engine(settings.DATABASE_URL, echo=True)

SessionLocal = async_sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    expire_on_commit=False,
)

async def get_db():
    async with SessionLocal() as session:
        yield session

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)\

async def drop_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)