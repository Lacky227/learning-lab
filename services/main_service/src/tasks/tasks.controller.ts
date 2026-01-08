import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/add')
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.create(createTaskDto);
  }

  @Get('/all')
  async findAll() {
    return await this.tasksService.findAll();
  }

  @Get('/one/:taskId')
  async findOne(@Param('taskId') taskId: string) {
    return await this.tasksService.findOne(taskId);
  }

  @Patch('/update/:taskId')
  async update(@Param('taskId') taskId: string, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.tasksService.update(taskId, updateTaskDto);
  }

  @Delete('/remove/:taskId')
  async remove(@Param('taskId') taskId: string) {
    return await this.tasksService.remove(taskId);
  }
}
