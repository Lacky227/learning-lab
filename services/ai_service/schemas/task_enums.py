from enum import Enum

class TaskPriorityEnum(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"

class TaskCategoryEnum(str, Enum):
    TASK = "TASK"
    FEATURE = "FEATURE"
    BUG = "BUG"
    GENERAL = "GENERAL"