import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { Prisma } from "@prisma/client";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter{
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let status = HttpStatus.BAD_REQUEST;
        let message = 'Database error';

        switch (exception.code) {
            case 'P2002':
                status = HttpStatus.CONFLICT;
                message = `Unique constraint failed on the field: ${exception.meta?.target}`;
                break;
            case 'P2025':
                message = exception.meta?.cause?.toString() || 'Record not found';
                status = HttpStatus.NOT_FOUND;
                break;
            default:
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