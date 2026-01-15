export class TaskNotFoundException extends Error {
    constructor(message?: string) {
        super(message || 'Task not found');
    }
}