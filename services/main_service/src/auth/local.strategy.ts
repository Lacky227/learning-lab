import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(LocalStrategy.name);
    constructor(private readonly authService: AuthService) {
        super({usernameField: 'email'});
    }
    async validate(email: string, password: string): Promise<any> {
        this.logger.log(`Login attempt with email: ${email}`);

        const user = await this.authService.validateUser(email, password);

        if (!user) {
            this.logger.warn(`Login failed for email: ${email}`);
            throw new UnauthorizedException();
        }

        this.logger.log(`Login successful for user: ${email}`);
        return user;
    }
}