from pydantic import BaseModel
from schemas.task_enums import TaskPriorityEnum, TaskCategoryEnum

class TaskAnalyzeRequest(BaseModel):
    description: str

class TaskAnalyzeResponse(BaseModel):
    priority: TaskPriorityEnum
    category: TaskCategoryEnum
