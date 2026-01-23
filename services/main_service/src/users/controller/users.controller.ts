import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UserCreateDto } from "../dto/user-create.dto";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@ApiInternalServerErrorResponse({ 
  description: 'Internal server error',
  schema: {
    example: {
      statusCode: 500,
      timestamp: '2024-01-01T00:00:00.000Z',
      path: '/users/add',
      message: 'Internal server error'
    }
  }
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/add')
  @ApiOperation({ 
    summary: 'Create a new user',
    description: 'Creates a new user with the provided details. ' +
                 'Requires username, email, password, and age.'
  })
  @ApiCreatedResponse({ 
    description: 'User successfully created.',
    schema: {
      example: {
        success: true,
        message: 'User john_doe added',
        data: {
          username: 'john_doe',
          email: 'john@example.com',
          age: 25
        }
      }
    }
  })
  @ApiBadRequestResponse({ 
    description: 'User already exists or invalid data provided.',
    schema: {
      example: {
        statusCode: 400,
        timestamp: '2024-01-01T00:00:00.000Z',
        path: '/users/add',
        message: 'User already exists'
      }
    }
  })
  addUser(@Body() dto: UserCreateDto) {
    return this.usersService.addUser(dto);
  }

  @Get('/:id')
  @ApiOperation({ 
    summary: 'Get user by ID',
    description: 'Retrieves a user by their unique ID.'
  })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the user to retrieve' })
  @ApiOkResponse({ 
    description: 'User successfully retrieved.',
    schema: {
      example: {
        success: true,
        message: 'User with id (1) found',
        data: {
          username: 'john_doe',
          email: 'john@example.com',
          age: 25
        }
      }
    }
  })
  @ApiNotFoundResponse({ 
    description: 'User not found with the provided ID.',
    schema: {
      example: {
        statusCode: 404,
        timestamp: '2024-01-01T00:00:00.000Z',
        path: '/users/1',
        message: 'User not found'
      }
    }
  })
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }
}
