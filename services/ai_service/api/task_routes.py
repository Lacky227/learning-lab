from fastapi import APIRouter, Depends

from core.task_ai_service import TaskAiService, get_task_ai_service
from schemas.task_schema import TaskAnalyzeRequest

router = APIRouter(
    prefix="/api/ai",
    tags=["Tasks AI"]
)

@router.post("/analyze") 
async def analyze_task(
    request: TaskAnalyzeRequest,
    service: TaskAiService = Depends(get_task_ai_service)
):
    result = await service.analyze_task(request.description)
    return result

    
