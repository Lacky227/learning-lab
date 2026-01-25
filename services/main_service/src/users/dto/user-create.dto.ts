import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsInt, Min } from "class-validator";

export class UserCreateDto {
    @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
    @IsString()
    username: string;

    @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'secure_password', description: 'The password of the user' })
    @IsString()
    password: string;

    @ApiProperty({ 
        type: Number,
        minimum: 0,
        maximum: 100,
        example: 25, 
        description: 'The age of the user' 
    })
    @IsInt()
    @Min(0)
    age: number;
}