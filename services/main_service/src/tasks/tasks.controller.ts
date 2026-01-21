import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/add')
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() user: any,
  ) {
    return await this.tasksService.create(createTaskDto, user?.id);
  }

  @Get('/all')
  async findAll(
    @CurrentUser() user: any,
  ) {
    return await this.tasksService.findAll(user?.id);
  }

  @Get('/one/:taskId')
  async findOne(
    @Param('taskId') taskId: string,
    @CurrentUser() user: any,
  ) {
    return await this.tasksService.findOne(taskId, user?.id);
  }

  @Patch('/update/:taskId')
  async update(
    @Param('taskId') taskId: string, 
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser() user: any,
  ) {
    return await this.tasksService.update(taskId, updateTaskDto, user?.id);
  }

  @Delete('/remove/:taskId')
  async remove(
    @Param('taskId') taskId: string,
    @CurrentUser() user: any,
  ) {
    return await this.tasksService.remove(taskId, user?.id);
  }
}
