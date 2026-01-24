import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import type { Request } from 'express';

@ApiTags('Auth')
@ApiInternalServerErrorResponse({
  description: 'Internal server error',
  schema: {
    example: {
      statusCode: 500,
      timestamp: '2024-01-01T00:00:00.000Z',
      path: '/auth/login',
      message: 'Internal server error',
    },
  },
})
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description:
      'Authenticates a user using email and password. ' +
      'On successful authentication, returns a JWT access token.',
  })
  @ApiBody({
    schema: {
      example: {
        email: 'john_doe@example.com',
        password: 'secure_password',
      },
    },
    description: 'User credentials',
  })
  @ApiOkResponse({
    description: 'User successfully authenticated',
    schema: {
      example: {
        access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
    schema: {
      example: {
        statusCode: 401,
        timestamp: '2024-01-01T00:00:00.000Z',
        path: '/auth/login',
        message: 'Unauthorized',
      },
    },
  })
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }
}