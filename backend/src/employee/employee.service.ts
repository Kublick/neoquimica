import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.entity';
import { EmployeeRepository } from './employee.repository';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  getEmployeeById(id: string): Promise<Employee> {
    return this.employeeRepository.getEmployeeById(id);
  }

  createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeRepository.createEmployee(createEmployeeDto);
  }

  async deleteEmployeeById(id: string): Promise<void> {
    const found = await this.getEmployeeById(id);
    if (found) {
      await this.employeeRepository.delete(id);
    }
  }
}
