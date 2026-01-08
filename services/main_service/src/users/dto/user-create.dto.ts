import { IsEmail, IsString, IsInt, Min } from "class-validator";

export class UserCreateDto {
    @IsString()
    username: string;
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    @IsInt()
    @Min(0)
    age: number;
}