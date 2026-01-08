from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from db.session import get_db
from schemas.user_schema import UserCreate, ApiResponse
from core.user_service import UserService, get_user_service

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)

@router.post(
    "/",
    response_model=ApiResponse,
    responses={400: {
        "description": "Credentials not allowed",
        "content": {
            "application/json": {
                "example": {"detail": "Credentials not allowed"}
            }
        }
    }},
    summary="Create a new user"
)
async def create_user(
        request: UserCreate,
        session: AsyncSession = Depends(get_db),
        service: UserService = Depends(get_user_service)
):
    result = await service.add_user(request, session)
    return result

@router.get(
    "/{user_id}",
    response_model=ApiResponse,
    responses={404: {
        "description": "User not found",
        "content": {
            "application/json": {
                "example": {"detail": "User not found"}
            }
        }
    }},
    summary="Get user by id"
)
async def get_user(
        user_id: int,
        session: AsyncSession = Depends(get_db),
        service: UserService = Depends(get_user_service)
):
    result = await service.get_user(user_id, session)
    return result