import { TaskCategory } from "../entities/enums/task-category.enum";
import { TaskPriority } from "../entities/enums/task-priority.enum";

export class ApiAiResponseDto {
    priority: TaskPriority;
    category: TaskCategory;
}