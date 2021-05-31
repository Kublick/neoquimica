import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Employee } from 'src/employee/employee.entity';
import { EmployeeRepository } from 'src/employee/employee.repository';
import { JwtPayload } from './jwt-payload.interface.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(EmployeeRepository)
    private employeeRepository: EmployeeRepository,
  ) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Employee> {
    const { name } = payload;
    const employee: Employee = await this.employeeRepository.findOne({ name });

    if (!employee) {
      throw new UnauthorizedException();
    }
    return employee;
  }
}
