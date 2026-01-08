
export class TaskNotFoundException extends Error {
    constructor(description: string) {
        super(description);
    }
}