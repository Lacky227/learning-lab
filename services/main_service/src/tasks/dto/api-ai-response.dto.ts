import { TaskCategory } from "../enums/task-category.enum";
import { TaskPriority } from "../enums/task-priority.enum";

export class ApiAiResponseDto {
    priority: TaskPriority;
    category: TaskCategory;
}