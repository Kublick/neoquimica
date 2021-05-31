import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Employee } from 'src/employee/employee.entity';

export const GetEmployee = createParamDecorator(
  (_data, ctx: ExecutionContext): Employee => {
    const req = ctx.switchToHttp().getRequest();
    console.log(req);
    return req.user;
  },
);
