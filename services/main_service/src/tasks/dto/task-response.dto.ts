import { ApiProperty } from '@nestjs/swagger';

export class TaskResponseDto {
  @ApiProperty({ example: 'uuid-v4', description: 'Unique task ID' })
  taskId: string;

  @ApiProperty({ example: 'Finish backend', description: 'Task title' })
  title: string;

  @ApiProperty({
    example: 'Complete services and controllers',
    description: 'Task description',
  })
  description: string;

  @ApiProperty({ example: 'HIGH', description: 'Task priority' })
  priority: string;

  @ApiProperty({ example: 'WORK', description: 'Task category' })
  category: string;

  @ApiProperty({ example: false, description: 'Task completion status' })
  isDone: boolean;

  constructor(
    taskId: string,
    title: string,
    description: string,
    priority: string,
    category: string,
    isDone: boolean,
  ) {
    this.taskId = taskId;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.category = category;
    this.isDone = isDone;
  }
}