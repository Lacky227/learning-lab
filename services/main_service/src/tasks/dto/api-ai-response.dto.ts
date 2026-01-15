import { IsEnum } from "class-validator";
import { TaskCategory } from "../enums/task-category.enum";
import { TaskPriority } from "../enums/task-priority.enum";

export class ApiAiResponseDto {
    @IsEnum(TaskPriority)
    priority: TaskPriority;
    @IsEnum(TaskCategory)
    category: TaskCategory;
}