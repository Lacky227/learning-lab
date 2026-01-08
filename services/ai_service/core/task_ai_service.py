from schemas.task_enums import TaskPriorityEnum, TaskCategoryEnum

class TaskAiService:
    async def analyze_task(self, description: str):
        text = description.lower()
        
        priority = TaskPriorityEnum.LOW

        if any(word in text for word in ["urgent", "important", "critical", "fix"]):
            priority = TaskPriorityEnum.HIGH
        elif any(word in text for word in ["medium", "normal"]):
            priority = TaskPriorityEnum.MEDIUM

        category = TaskCategoryEnum.TASK

        if any(word in text for word in ["feature", "new", "add", "implement"]):
            category = TaskCategoryEnum.FEATURE
            
        if any(word in text for word in ["bug", "fix", "error", "defect"]):
            category = TaskCategoryEnum.BUG
            
        if any(word in text for word in ["general", "other"]):
            category = TaskCategoryEnum.GENERAL

        return {"priority": priority, "category": category}


task_ai_service_instance = TaskAiService()

def get_task_ai_service():
    return task_ai_service_instance