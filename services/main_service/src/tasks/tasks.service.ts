import { Injectable, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';
import { ApiResponseDto } from './dto/api-response.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { TaskCategory } from './enums/task-category.enum';
import { TaskPriority } from './enums/task-priority.enum';
import { v4 as uuidv4 } from 'uuid';
import { AiService } from './ai.service';
import { TaskNotFoundException } from './exceptions/task-not-found.exception';
import { TaskStatus } from './enums/task-status.enum';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly aiService: AiService,
  ) {}
  
  async create(createTaskDto: CreateTaskDto, userId: number): Promise<ApiResponseDto<any>> {
    this.logger.log(`Creating task: "${createTaskDto.title}"`);

    const task = createTaskDto as any;
    task.taskId = uuidv4();

    this.logger.debug(`Generated taskId: ${task.taskId}`);

    const aiResult = await this.aiService.analyzeTaskContent(task.description);

    task.priority = aiResult?.priority ?? TaskPriority.MEDIUM;
    task.category = aiResult?.category ?? TaskCategory.GENERAL;
    task.status = TaskStatus.TO_DO;
    task.isDone = false;
    task.userId = userId;

    this.logger.debug(
      `AI analyzed task ${task.taskId}: priority=${task.priority}, category=${task.category}`
    );

    await this.taskRepository.create(task);

    this.logger.log(`Task created successfully: ${task.taskId}`);

    return {
      success: true,
      message: 'Task ' + task.taskId + ' added',
      data: new TaskResponseDto(
        task.taskId,
        task.title,
        task.description,
        task.priority,
        task.category,
        task.isDone
      )
    };
  }

  async findAll(userId: number): Promise<ApiResponseDto<any>> {
    this.logger.log('Fetching all tasks');

    const tasks = await this.taskRepository.findAllByUserId(userId);

    this.logger.log(`Tasks found: ${tasks.length}`);

    return {
      success: true,
      message: 'Tasks found (' + tasks.length + ')',
      data: tasks.map(task => new TaskResponseDto(
        task.taskId,
        task.title,
        task.description ?? '',
        task.priority,
        task.category,
        task.isDone
      ))
    };
  }

  async findOne(taskId: string, userId: number): Promise<ApiResponseDto<any>> {
    this.logger.log(`Fetching task by id: ${taskId}`);

    const task = await this.taskRepository.findOneByTaskId(taskId, userId);

    if (!task) {
      this.logger.warn(`Task not found: ${taskId}`);
      throw new TaskNotFoundException('Task ' + taskId + ' not found');
    }

    this.logger.log(`Task found: ${taskId}`);

    return {
      success: true,
      message: 'Task ' + taskId + ' found',
      data: new TaskResponseDto(
        task.taskId,
        task.title,
        task.description ?? '',
        task.priority,
        task.category,
        task.isDone
      )
    };
  }

  async update(taskId: string, updateTaskDto: UpdateTaskDto, userId: number): Promise<ApiResponseDto<any>> {
    this.logger.log(`Updating task: ${taskId}`);

    const task = await this.taskRepository.findOneByTaskId(taskId, userId);

    if (!task) {
      this.logger.warn(`Update failed. Task not found: ${taskId}`);
      throw new TaskNotFoundException('Task ' + taskId + ' not found');
    }

    await this.taskRepository.update(taskId, updateTaskDto);

    this.logger.log(`Task updated successfully: ${taskId}`);

    return {
      success: true,
      message: 'Task ' + taskId + ' updated',
      data: new TaskResponseDto(
        task.taskId,
        task.title,
        task.description ?? '',
        task.priority,
        task.category,
        task.isDone
      )
    };
  }

  async remove(taskId: string, userId: number): Promise<ApiResponseDto<any>> {
    this.logger.log(`Removing task: ${taskId}`);

    const task = await this.taskRepository.findOneByTaskId(taskId, userId);

    if (!task) {
      this.logger.warn(`Remove failed. Task not found: ${taskId}`);
      throw new TaskNotFoundException('Task ' + taskId + ' not found');
    }

    await this.taskRepository.remove(task);

    this.logger.log(`Task removed successfully: ${taskId}`);

    return {
      success: true,
      message: 'Task ' + task.taskId + ' removed',
      data: new TaskResponseDto(
        task.taskId,
        task.title,
        task.description ?? '',
        task.priority,
        task.category,
        task.isDone
      )
    };
  }
}

