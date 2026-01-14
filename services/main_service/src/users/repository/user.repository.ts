import {Injectable} from "@nestjs/common";
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository{
    constructor(
        private readonly prismaService: PrismaService,
    ) {}

    async findByUsernameOrEmail(username?: string, email?: string): Promise<User | null> {
        return this.prismaService.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email }
                ],
            },
        });
    }

    async create(dto: Prisma.UserCreateInput): Promise<User> {
        return this.prismaService.user.create({
            data: dto
        });
    }

    async findOneById(id: number): Promise<User | null> {
        return this.prismaService.user.findUnique({ where: { id } });
    }
    
}