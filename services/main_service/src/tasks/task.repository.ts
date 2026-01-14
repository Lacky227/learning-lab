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

    async findAll(): Promise<Task[]> {
        return this.prismaService.task.findMany();
    }

    async findOneByTaskId(taskId: string): Promise<Task | null> {
        return await this.prismaService.task.findUnique({ where: { taskId } });
    }

    async remove(taskId: string) {
        return await this.prismaService.task.delete({ where: { taskId } });
    }
}