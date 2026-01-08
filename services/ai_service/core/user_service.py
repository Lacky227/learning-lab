from sqlalchemy.ext.asyncio import AsyncSession

from crud.repository import UserRepository
from models.user_model import User
from schemas.user_schema import UserCreate, UserResponse


class UserService:
    async def add_user(self, data: UserCreate, session: AsyncSession):
        existing_user = await UserRepository.find_user_by_username_or_email(data.username, data.email, session)
        if existing_user:
            return None
        user = User(**data.model_dump())
        user = await UserRepository.add_user(user, session)
        return {"success": True, "message": f"User {user.username} created", "data": UserResponse.model_validate(user)}

    async def get_user(self, user_id: int, session: AsyncSession):
        user = await UserRepository.get_user_by_id(user_id, session)
        if user is None:
            return None
        user_response = UserResponse.model_validate(user)
        return {"success": True, "message": f"User with id ({user_id}) found", "data": user_response}

user_service_instance = UserService()

def get_user_service():
    return user_service_instance