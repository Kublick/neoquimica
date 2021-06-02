import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee, EmployeeDocument } from './schemas/employee.schema';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async getEmployeeById(id: string): Promise<Employee> {
    return await this.employeeModel.findById({ _id: id }).exec();
  }

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    const { name, role, sucursal, password } = createEmployeeDto;

    const found = await this.employeeModel.findOne({ name });
    if (found) {
      throw new ConflictException('El empleado ya existe');
    }

    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      const employee = new this.employeeModel({
        name,
        password: hashPassword,
        sucursal,
        role,
        registeredOn: new Date(),
      });

      await employee.save();
      return;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async deleteEmployeeById(id: string): Promise<void> {
    const found = await this.getEmployeeById(id);
    if (found) {
      await this.employeeModel.findOneAndDelete({ _id: id });
    }
  }
}
