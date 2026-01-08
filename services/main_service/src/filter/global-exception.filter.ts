import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { TaskNotFoundException } from '../tasks/exceptions/task-not-found.exception';
import { UserNotFoundException } from 'src/users/exception/user-not-found.exception';
import { UserAlreadyExistsException } from 'src/users/exception/user-already-exists.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        if (exception instanceof TaskNotFoundException){
            status =HttpStatus.NOT_FOUND;
            message = exception.message;
        } else if (exception instanceof UserNotFoundException){
            status = HttpStatus.NOT_FOUND;
            message = exception.message;
        } else if (exception instanceof UserAlreadyExistsException){
            status = HttpStatus.BAD_REQUEST;
            message = exception.message;
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: message,
        });
    }
}