import { NotFoundException } from "@nestjs/common";

export class TaskNotFoundException extends NotFoundException {
    constructor(message?: string) {
        super(message || 'Task not found');
    }
}