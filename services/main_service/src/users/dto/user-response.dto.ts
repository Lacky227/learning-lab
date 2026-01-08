
export class UserResponseDto {
    username: string;
    email: string;
    age: number;

    constructor(username: string, email: string, age: number) {
        this.username = username;
        this.email = email;
        this.age = age;
    }
}