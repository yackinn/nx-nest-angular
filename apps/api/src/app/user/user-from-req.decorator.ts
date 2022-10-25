import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request }                                from 'express';
import { User }                                   from './models/user.entity';

export const UserFromReq = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User | undefined => {
    const request: Request = ctx.switchToHttp().getRequest();

    return request.user as User;
  }
);


