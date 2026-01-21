import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export interface ActiveUser {
  id: number;
  email: string;
}

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): ActiveUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);