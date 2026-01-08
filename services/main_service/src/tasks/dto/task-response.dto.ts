import { TaskCategory } from "../entities/enums/task-category.enum";
import { TaskPriority } from "../entities/enums/task-priority.enum";

export class TaskResponseDto {
    taskId: string;
    title: string;
    description: string;
    priority: TaskPriority;
    category: TaskCategory;
    isDone: boolean;

    constructor(taskId: string, title: string, description: string, priority: TaskPriority, category: TaskCategory, isDone: boolean) {
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.category = category;
        this.isDone = isDone;
    }
}