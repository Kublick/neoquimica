import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.entity';
import { EmployeeRepository } from './employee.respository';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  async getEmployeeById(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne(id);

    if (!employee) {
      throw new NotFoundException('El empleado no existe');
    }
    return employee;
  }

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    const { name, role, sucursal, password } = createEmployeeDto;

    const employee = this.employeeRepository.create({
      name,
      password,
      sucursal,
      role,
      registeredOn: new Date(),
    });

    await this.employeeRepository.save(employee);

    return employee;
  }

  async deleteEmployeeById(id: string): Promise<void> {
    const found = await this.getEmployeeById(id);
    if (found) {
      const result = await this.employeeRepository.delete(id);
      console.log(result);
    }
  }
}
