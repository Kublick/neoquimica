import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  Employee,
  EmployeeDocument,
} from 'src/employee/schemas/employee.schema';
import { JwtPayload } from './jwt-payload.interface.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Employee> {
    const { name } = payload;
    const employee: Employee = await this.employeeModel.findOne({ name });

    if (!employee) {
      throw new UnauthorizedException();
    }
    return employee;
  }
}
