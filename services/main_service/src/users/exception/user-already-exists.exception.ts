import { BadRequestException } from "@nestjs/common";

export class UserAlreadyExistsException extends BadRequestException {
    constructor(message?: string) {
        super(message || 'User already exists');
    }
}