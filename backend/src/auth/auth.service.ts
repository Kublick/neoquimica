import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeRepository } from 'src/employee/employee.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private employeeRepository: EmployeeRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { name, password } = authCredentialsDto;

    const employee = await this.employeeRepository.findOne({ name });

    if (employee && (await bcrypt.compare(password, employee.password))) {
      const payload: JwtPayload = {
        name,
        role: employee.role,
        sucursal: employee.sucursal,
      };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Por favor verifica tus credenciales');
    }
  }
}
