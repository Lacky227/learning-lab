import { Injectable, Logger } from '@nestjs/common';
import { UserCreateDto } from "../dto/user-create.dto";
import { ApiResponseDto } from "../dto/api-response.dto";
import { UserRepository } from "../repository/user.repository";
import { UserAlreadyExistsException } from "../exception/user-already-exists.exception";
import { UserResponseDto } from "../dto/user-response.dto";
import { UserNotFoundException } from "../exception/user-not-found.exception";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    constructor(
        private readonly userRepository: UserRepository
    ) {}

        async addUser(dto: UserCreateDto): Promise<ApiResponseDto<any>> {
        this.logger.log(`Attempt to create user: ${dto.username} (${dto.email})`);

        const exists = await this.userRepository.findByUsernameOrEmail(dto.username, dto.email);
        if (exists) {
            this.logger.warn(
                `User creation failed. Username or email already exists: ${dto.username} / ${dto.email}`
            );
            throw new UserAlreadyExistsException();
        }

        dto.password = await bcrypt.hash(dto.password, 10);
        this.logger.debug(`Password hashed for user: ${dto.username}`);

        const user = await this.userRepository.create(dto);

        this.logger.log(`User created successfully. ID: ${user.id}, Username: ${user.username}`);

        return {
            success: true,
            message: 'User ' + user.username + ' added',
            data: new UserResponseDto(
                user.username,
                user.email,
                user.age ?? undefined
            )
        };
    }

    async getUserById(id: number): Promise<ApiResponseDto<any>> {
        this.logger.log(`Searching user by id: ${id}`);

        const user = await this.userRepository.findOneById(id);
        if (!user) {
            this.logger.warn(`User not found by id: ${id}`);
            throw new UserNotFoundException();
        }

        this.logger.log(`User found by id: ${id} (${user.username})`);

        return {
            success: true,
            message: 'User with id (' + id + ') found',
            data: new UserResponseDto(
                user.username,
                user.email,
                user.age ?? undefined
            )
        };
    }

    async getUserByEmail(email: string) {
        this.logger.log(`Searching user by email: ${email}`);

        const user = await this.userRepository.findByUsernameOrEmail(undefined, email);
        if (!user) {
            this.logger.warn(`User not found by email: ${email}`);
            throw new UserNotFoundException();
        }

        this.logger.log(`User found by email: ${email} (${user.username})`);

        return user;
    }
}
