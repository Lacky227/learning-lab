export class TaskResponseDto {
    taskId: string;
    title: string;
    description: string;
    priority: string;
    category: string;
    isDone: boolean;

    constructor(taskId: string, title: string, description: string, priority: string, category: string, isDone: boolean) {
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.category = category;
        this.isDone = isDone;
    }
}