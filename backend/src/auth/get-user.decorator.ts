import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Employee } from 'src/employee/schemas/employee.schema';

export const GetEmployee = createParamDecorator(
  (_data, ctx: ExecutionContext): Employee => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
