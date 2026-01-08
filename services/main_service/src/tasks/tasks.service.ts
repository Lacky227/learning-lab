import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';
import { ApiResponseDto } from './dto/api-response.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { TaskCategory } from './entities/enums/task-category.enum';
import { TaskPriority } from './entities/enums/task-priority.enum';
import { v4 as uuidv4 } from 'uuid';
import { AiService } from './ai.service';
import { TaskNotFoundException } from 'src/tasks/exceptions/task-not-found.exception';

@Injectable()
export class TasksService {

  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly aiService: AiService,
  ) {}
  
  async create(createTaskDto: CreateTaskDto): Promise<ApiResponseDto<any>>{
    const task = this.taskRepository.create(createTaskDto);
    task.taskId = uuidv4();
    const aiResult = await this.aiService.analyzeTaskContent(task.description);
    task.priority = aiResult?.priority ?? TaskPriority.MEDIUM;
    task.category = aiResult?.category ?? TaskCategory.GENERAL;
    task.isDone = false;
    await this.taskRepository.save(task);
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

  async findAll(): Promise<ApiResponseDto<any>> {
    const tasks = await this.taskRepository.findAll();
    return {
      success: true,
      message: 'Tasks found (' + tasks.length + ')',
      data: tasks.map(task => new TaskResponseDto(
        task.taskId,
        task.title,
        task.description,
        task.priority,
        task.category,
        task.isDone
      ))
    }
  }

  async findOne(taskId: string): Promise<ApiResponseDto<any>> {
    const task = await this.taskRepository.findOneByTaskId(taskId);
    if (!task) {
      throw new TaskNotFoundException('Task ' + taskId + ' not found');
    }
    return {
      success: true,
      message: 'Task ' + taskId + ' found',
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

  async update(taskId: string, updateTaskDto: UpdateTaskDto): Promise<ApiResponseDto<any>> {
    const task = await this.taskRepository.findOneByTaskId(taskId);
    if (!task) {
      throw new TaskNotFoundException('Task ' + taskId + ' not found');
    }
    const updatedTask = this.taskRepository.create({ ...task, ...updateTaskDto });
    await this.taskRepository.update(taskId, updatedTask);
    return {
      success: true,
      message: 'Task ' + taskId + ' updated',
      data: new TaskResponseDto(
        updatedTask.taskId,
        updatedTask.title,
        updatedTask.description,
        updatedTask.priority,
        updatedTask.category,
        updatedTask.isDone
      )
    };
  }

  async remove(taskId: string): Promise<ApiResponseDto<any>> {
    const task = await this.taskRepository.findOneByTaskId(taskId);
    if (!task) {
      throw new TaskNotFoundException('Task ' + taskId + ' not found');
    }
    await this.taskRepository.remove(taskId);
    return {
      success: true,
      message: 'Task ' + task.taskId + ' removed',
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
}

