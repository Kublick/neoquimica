import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Employee } from 'src/employee/schemas/employee.schema';

export const GetEmployee = createParamDecorator(
  (data, ctx: ExecutionContext): Employee => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    return data ? user?.[data] : user;
  },
);
