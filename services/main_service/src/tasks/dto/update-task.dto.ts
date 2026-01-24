import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { TaskPriority } from '../enums/task-priority.enum';
import { TaskCategory } from '../enums/task-category.enum';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiPropertyOptional({
    enum: TaskPriority,
    example: TaskPriority.HIGH,
    description: 'Task priority',
  })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @ApiPropertyOptional({
    enum: TaskCategory,
    example: TaskCategory.WORK,
    description: 'Task category',
  })
  @IsEnum(TaskCategory)
  @IsOptional()
  category?: TaskCategory;

  @ApiPropertyOptional({
    example: true,
    description: 'Task completion status',
  })
  @IsBoolean()
  @IsOptional()
  isDone?: boolean;
}