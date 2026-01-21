import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        this.logger.log(`Validating user credentials for email: ${email}`);

        const user = await this.usersService.getUserByEmail(email);

        if (!user) {
            this.logger.warn(`User not found during login: ${email}`);
            return null;
        }

        const passwordValid = await bcrypt.compare(pass, user.password);

        if (!passwordValid) {
            this.logger.warn(`Invalid password for email: ${email}`);
            return null;
        }

        this.logger.log(`User credentials validated: ${email}`);

        const { password, ...result } = user;
        return result;
    }

    async login(user: any) {
        this.logger.log(`Generating JWT for user: ${user.email}`);

        const payload = { email: user.email, sub: user.id };
        const token = this.jwtService.sign(payload);

        this.logger.log(`JWT generated for user: ${user.email}`);

        return {
            access_token: token,
        };
    }
}
