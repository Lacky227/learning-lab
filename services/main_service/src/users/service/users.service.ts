import { Injectable } from '@nestjs/common';
import { UserCreateDto } from "../dto/user-create.dto";
import { ApiResponseDto } from "../dto/api-response.dto";
import { UserRepository } from "../repository/user.repository";
import { UserAlreadyExistsException } from "../exception/user-already-exists.exception";
import { UserResponseDto } from "../dto/user-response.dto";
import { UserNotFoundException } from "../exception/user-not-found.exception";

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async addUser(dto: UserCreateDto): Promise<ApiResponseDto<any>> {
        const exists = await this.userRepository.findByUsernameOrEmail(dto.username, dto.email);
        if (exists) {
            throw new UserAlreadyExistsException();
        }

        const user = await this.userRepository.create(dto);

        return {
            success: true,
            message: 'User ' + user.username + ' added',
            data: new UserResponseDto(
                user.username,
                user.email,
                user.age ?? undefined
            )
        }
    }

    async getUserById(id: number): Promise<ApiResponseDto<any>> {
        const user = await this.userRepository.findOneById(id);
        if (!user) {
            throw new UserNotFoundException();
        }

        return {
            success: true,
            message: 'User with id (' + id + ') found',
            data: new UserResponseDto(
                user.username,
                user.email,
                user.age ?? undefined
            )
        }
    }
}
