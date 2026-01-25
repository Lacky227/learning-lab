import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import type { ActiveUser } from 'src/auth/current-user.decorator';

@ApiTags('Tasks')
@ApiBearerAuth()
@ApiInternalServerErrorResponse({
  description: 'Internal server error',
  schema: {
    example: {
      statusCode: 500,
      timestamp: '2024-01-01T00:00:00.000Z',
      path: '/tasks',
      message: 'Internal server error',
    },
  },
})
@ApiUnauthorizedResponse({
  description: 'Unauthorized (JWT token is missing or invalid)',
  schema: {
    example: {
      statusCode: 401,
      timestamp: '2024-01-01T00:00:00.000Z',
      path: '/tasks',
      message: 'Unauthorized',
    },
  },
})
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post('/add')
  @ApiOperation({
    summary: 'Create a new task',
    description:
      'Creates a new task for the authenticated user. ' +
      'Task priority and category may be assigned automatically by AI.',
  })
  @ApiCreatedResponse({
    description: 'Task successfully created',
    schema: {
      example: {
        success: true,
        message: 'Task 550e8400-e29b-41d4-a716-446655440000 created',
        data: {
          taskId: '550e8400-e29b-41d4-a716-446655440000',
          title: 'Finish backend module',
          description: 'Complete TasksService and Swagger docs',
          priority: 'HIGH',
          category: 'TASK',
          isDone: false,
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
    schema: {
      example: {
        statusCode: 400,
        timestamp: '2024-01-01T00:00:00.000Z',
        path: '/tasks/add',
        message: 'Invalid task data provided',
      },
    },
  })
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() user: ActiveUser,
  ) {
    return await this.tasksService.create(createTaskDto, user?.id);
  }

  @Get('/all')
  @ApiOperation({
    summary: 'Get all user tasks',
    description: 'Returns all tasks that belong to the authenticated user.',
  })
  @ApiOkResponse({
    description: 'Tasks successfully found',
    schema: {
      example: {
        success: true,
        message: 'Tasks found (1)',
        data: [
          {
            taskId: '550e8400-e29b-41d4-a716-446655440000',
            title: 'Learn NestJS',
            description: 'Finish guards and decorators',
            priority: 'HIGH',
            category: 'TASK',
            isDone: false,
          },
        ],
      },
    },
  })
  async findAll(@CurrentUser() user: ActiveUser) {
    return await this.tasksService.findAll(user?.id);
  }

  @Get('/one/:taskId')
  @ApiOperation({
    summary: 'Get task by ID',
    description: 'Returns a single task by its unique taskId.',
  })
  @ApiParam({
    name: 'taskId',
    description: 'Unique task identifier (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Task successfully found',
    schema: {
      example: {
        success: true,
        message: 'Task 550e8400-e29b-41d4-a716-446655440000 found',
        data: {
          taskId: '550e8400-e29b-41d4-a716-446655440000',
          title: 'Finish backend module',
          description: 'Complete TasksService and Swagger docs',
          priority: 'HIGH',
          category: 'TASK',
          isDone: false,
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Task not found or does not belong to the user',
    schema: {
      example: {
        statusCode: 404,
        timestamp: '2024-01-01T00:00:00.000Z',
        path: '/tasks/one/550e8400-e29b-41d4-a716-446655440000',
        message: 'Task not found',
      },
    },
  })
  async findOne(
    @Param('taskId') taskId: string,
    @CurrentUser() user: ActiveUser,
  ) {
    return await this.tasksService.findOne(taskId, user?.id);
  }

  @Patch('/update/:taskId')
  @ApiOperation({
    summary: 'Update task',
    description:
      'Updates task fields such as title, description, priority, category or status.',
  })
  @ApiParam({
    name: 'taskId',
    description: 'Unique task identifier (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Task successfully updated',
    schema: {
      example: {
        success: true,
        message: 'Task 550e8400-e29b-41d4-a716-446655440000 updated',
        data: {
          taskId: '550e8400-e29b-41d4-a716-446655440000',
          title: 'Finish backend module',
          description: 'Complete TasksService and Swagger docs',
          priority: 'HIGH',
          category: 'TASK',
          isDone: true,
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
    schema: {
      example: {
        statusCode: 404,
        timestamp: '2024-01-01T00:00:00.000Z',
        path: '/tasks/update/550e8400-e29b-41d4-a716-446655440000',
        message: 'Task not found',
      },
    },
  })
  async update(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser() user: ActiveUser,
  ) {
    return await this.tasksService.update(taskId, updateTaskDto, user?.id);
  }

  @Delete('/remove/:taskId')
  @ApiOperation({
    summary: 'Delete task',
    description: 'Deletes a task that belongs to the authenticated user.',
  })
  @ApiParam({
    name: 'taskId',
    description: 'Unique task identifier (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Task successfully removed',
    schema: {
      example: {
        success: true,
        message: 'Task 550e8400-e29b-41d4-a716-446655440000 removed',
        data: null,
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
    schema: {
      example: {
        statusCode: 404,
        timestamp: '2024-01-01T00:00:00.000Z',
        path: '/tasks/remove/550e8400-e29b-41d4-a716-446655440000',
        message: 'Task not found',
      },
    },
  })
  async remove(
    @Param('taskId') taskId: string,
    @CurrentUser() user: ActiveUser,
  ) {
    return await this.tasksService.remove(taskId, user?.id);
  }
}