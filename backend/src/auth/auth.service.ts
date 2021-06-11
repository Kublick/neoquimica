import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Employee,
  EmployeeDocument,
} from 'src/employee/schemas/employee.schema';

@Injectable()
export class AuthService {
  logger = new Logger('AuthController');
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
    private jwtService: JwtService,
  ) {}

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    this.logger.verbose(`loggin in ${JSON.stringify(authCredentialsDto)}`);
    const { name, password } = authCredentialsDto;

    const employee = await this.employeeModel.findOne({ name });

    if (employee && (await bcrypt.compare(password, employee.password))) {
      const payload: JwtPayload = {
        name,
        role: employee.role,
        sucursal: employee.sucursal,
      };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Verifica tus credenciales');
    }
  }
}
