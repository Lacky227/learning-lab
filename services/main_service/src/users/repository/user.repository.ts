import { Repository } from 'typeorm';
import { User } from "../entity/user.entity";
import {Injectable} from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository{
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) {}

    async findByUsernameOrEmail(username: string, email: string): Promise<User | null> {
        return this.repository.findOne({
            where: [{ username }, { email }],
        });
    }

    create(user: Partial<User>): User {
        return this.repository.create(user);
    }

    save(user: User) {
        return this.repository.save(user);
    }

    async findOneById(id: number): Promise<User | null> {
        return this.repository.findOne({ where: { id } });
    }
    
}