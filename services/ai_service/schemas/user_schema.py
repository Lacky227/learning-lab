from typing import Optional

from pydantic import BaseModel, Field, EmailStr, ConfigDict


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str = Field(min_length=8)
    age: int = Field(gt=0)

class UserResponse(BaseModel):
    username: str
    email: EmailStr
    age: int
    model_config = ConfigDict(from_attributes=True)

class ApiResponse(BaseModel):
    success: bool
    message: Optional[str] = None
    data: Optional[UserResponse] = None