import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
    @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
    username: string;

    @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
    email: string;

    @ApiProperty({ example: 25, description: 'The age of the user', required: false })
    age?: number;

    constructor(username: string, email: string, age?: number) {
        this.username = username;
        this.email = email;
        this.age = age;
    }
}