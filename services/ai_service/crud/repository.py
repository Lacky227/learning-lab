from pydantic import EmailStr
from sqlalchemy import select, or_
from sqlalchemy.ext.asyncio import AsyncSession

from models.user_model import User


class UserRepository:
    @staticmethod
    async def add_user(user: User, session: AsyncSession) -> User | None:
        session.add(user)
        await session.commit()
        await session.refresh(user)
        return user

    @staticmethod
    async def get_user_by_id(user_id: int, session: AsyncSession) -> User | None:
        result = await session.execute(select(User).where(User.id == user_id))
        return result.scalar_one_or_none()

    @staticmethod
    async def find_user_by_username_or_email(username: str, email: EmailStr, session: AsyncSession) -> User | None:
        stmt = select(User).where(or_(User.username == username, User.email == email))
        result = await session.execute(stmt)
        return result.scalar_one_or_none()
