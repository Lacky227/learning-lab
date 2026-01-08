import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "./entities/task.entity";

@Injectable()
export class TaskRepository {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>
    ) {}

    create(task: Partial<Task>): Task {
        return this.taskRepository.create(task);
    }

    async save(task: Task) {
        return await this.taskRepository.save(task);
    }

    async update(taskId: string, task: Task) {
        return await this.taskRepository.update(taskId, task);
    }

    async findAll(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    async findOneByTaskId(taskId: string): Promise<Task | null> {
        return await this.taskRepository.findOne({ where: { taskId } });
    }

    async remove(taskId: string) {
        return await this.taskRepository.delete({ taskId });
    }
}