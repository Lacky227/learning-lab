from schemas.task_enums import TaskPriorityEnum, TaskCategoryEnum
from setfit import SetFitModel
from typing import List, cast
class TaskAiService:
    def __init__(self):
        self.priority_model = SetFitModel.from_pretrained("/app/ai_models/setfit_model_priority")
        self.category_model = SetFitModel.from_pretrained("/app/ai_models/setfit_model_category")

    async def analyze_task(self, description: str):
        priority_preds = cast(List[str], self.priority_model.predict([description]))
        category_preds = cast(List[str], self.category_model.predict([description]))

        priority = TaskPriorityEnum(priority_preds[0])
        category = TaskCategoryEnum(category_preds[0])

        return {
            "priority": priority, 
            "category": category
            }


task_ai_service_instance = TaskAiService()

def get_task_ai_service():
    return task_ai_service_instance