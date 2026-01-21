import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma, Task } from "@prisma/client"
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TaskRepository {
    constructor(
        private readonly prismaService: PrismaService,
    ) {}

    async create(dto: Prisma.TaskCreateInput): Promise<Task> {
        return this.prismaService.task.create({
            data: dto
        });
    }

    async update(taskId: string, dto: UpdateTaskDto): Promise<Task> {
        return this.prismaService.task.update(
            {
                where: { taskId },
                data: dto
            }
        );
    }

    async findAllByUserId(userId: number): Promise<Task[]> {
        return this.prismaService.task.findMany({
            where: { userId }
        });
    }

    async findOneByTaskId(taskId: string, userId: number): Promise<Task | null> {
        return await this.prismaService.task.findFirst({ where: { taskId, userId } });
    }

    async remove(task: Task): Promise<Task> {
        return await this.prismaService.task.delete({ where: { taskId: task.taskId } });
    }
}