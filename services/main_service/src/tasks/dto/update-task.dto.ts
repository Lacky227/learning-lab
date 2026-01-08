import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsBoolean, IsEnum } from 'class-validator';
import { TaskPriority } from '../entities/enums/task-priority.enum';
import { TaskCategory } from '../entities/enums/task-category.enum';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsEnum(TaskPriority)
    priority: TaskPriority;
    
    @IsEnum(TaskCategory)
    category: TaskCategory;

    @IsBoolean()
    isDone: boolean;
}
