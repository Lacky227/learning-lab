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
import { Category, Priority, Status, Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly aiService: AiService,
  ) {}
  
  async create(createTaskDto: CreateTaskDto, userId: number): Promise<ApiResponseDto<TaskResponseDto>> {
    this.logger.log(`Creating task: "${createTaskDto.title}"`);

    const aiResult = await this.aiService.analyzeTaskContent(createTaskDto.description ?? '');

    const taskInput = this.buildTaskCreateInput(createTaskDto, userId, aiResult ?? { category: TaskCategory.GENERAL, priority: TaskPriority.MEDIUM });

    this.logger.debug(
      `AI analyzed task ${taskInput.taskId}: priority=${taskInput.priority}, category=${taskInput.category}`
    );
    
    const createdTask = await this.taskRepository.create(taskInput);

    this.logger.log(`Task created successfully: ${createdTask.taskId}`);

    return ApiResponseDto.success(
      'Task ' + createdTask.taskId + ' created',
      new TaskResponseDto(
        createdTask.taskId,
        createdTask.title,
        createdTask.description ?? '',
        createdTask.priority,
        createdTask.category,
        createdTask.isDone
      )
    )
  }

  async findAll(userId: number): Promise<ApiResponseDto<TaskResponseDto[]>> {
    this.logger.log('Fetching all tasks');

    const tasks = await this.taskRepository.findAllByUserId(userId);

    this.logger.log(`Tasks found: ${tasks.length}`);

    return ApiResponseDto.success(
      'Tasks found (' + tasks.length + ')',
      tasks.map(task => new TaskResponseDto(
        task.taskId,
        task.title,
        task.description ?? '',
        task.priority,
        task.category,
        task.isDone
      ))
    );
  }

  async findOne(taskId: string, userId: number): Promise<ApiResponseDto<TaskResponseDto>> {
    this.logger.log(`Fetching task by id: ${taskId}`);

    const task = await this.taskRepository.findOneByTaskId(taskId, userId);

    if (!task) {
      this.logger.warn(`Task not found: ${taskId}`);
      throw new TaskNotFoundException('Task ' + taskId + ' not found');
    }

    this.logger.log(`Task found: ${taskId}`);

    return ApiResponseDto.success(
      'Task ' + taskId + ' found',
      new TaskResponseDto(
        task.taskId,
        task.title,
        task.description ?? '',
        task.priority,
        task.category,
        task.isDone
      )
    );
  }

  async update(taskId: string, updateTaskDto: UpdateTaskDto, userId: number): Promise<ApiResponseDto<TaskResponseDto>> {
    this.logger.log(`Updating task: ${taskId}`);

    const task = await this.taskRepository.findOneByTaskId(taskId, userId);

    if (!task) {
      this.logger.warn(`Update failed. Task not found: ${taskId}`);
      throw new TaskNotFoundException('Task ' + taskId + ' not found');
    }

    await this.taskRepository.update(taskId, updateTaskDto);

    this.logger.log(`Task updated successfully: ${taskId}`);

    return ApiResponseDto.success(
      'Task ' + taskId + ' updated',
      new TaskResponseDto(
        task.taskId,
        updateTaskDto.title ?? task.title,
        updateTaskDto.description ?? task.description ?? '',
        updateTaskDto.priority ?? task.priority,
        updateTaskDto.category ?? task.category,
        updateTaskDto.isDone ?? task.isDone
      )
    )
  }

  async remove(taskId: string, userId: number): Promise<ApiResponseDto<null>> {
    this.logger.log(`Removing task: ${taskId}`);

    const task = await this.taskRepository.findOneByTaskId(taskId, userId);

    if (!task) {
      this.logger.warn(`Remove failed. Task not found: ${taskId}`);
      throw new TaskNotFoundException('Task ' + taskId + ' not found');
    }

    await this.taskRepository.remove(task);

    this.logger.log(`Task removed successfully: ${taskId}`);

    return ApiResponseDto.success(
      'Task ' + taskId + ' removed',
      null
    )
  }

  private buildTaskCreateInput(dto: CreateTaskDto, userId: number, aiResult: { category: TaskCategory; priority: TaskPriority; }): Prisma.TaskCreateInput {
    return {
      taskId: uuidv4(),
      title: dto.title || 'Untitled Task',
      description: dto.description,
      priority: 
       Priority[aiResult?.priority as keyof typeof Priority] ?? Priority.MEDIUM,
      category: 
       Category[aiResult?.category as keyof typeof Category] ?? Category.GENERAL,
      status: Status[TaskStatus.TO_DO],
      isDone: false,
      user: { connect: { id: userId } },
    };
  }
}

