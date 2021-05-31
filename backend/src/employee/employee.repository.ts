import { ConflictException, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
  async getEmployeeById(id: string): Promise<Employee> {
    const employee = await this.findOne(id);

    if (!employee) {
      throw new NotFoundException('El empleado no existe');
    }
    return employee;
  }

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    const { name, role, sucursal, password } = createEmployeeDto;

    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      const employee = this.create({
        name,
        password: hashPassword,
        sucursal,
        role,
        registeredOn: new Date(),
      });

      await this.save(employee);

      return;
    } catch (error) {
      console.log(error.code);
      throw new ConflictException('El empleado ya existe');
    }
  }

  // async getEmployeeByName(name: string): Promise<any> {
  //   const employee = await this.findOne(name);

  //   if (!employee) {
  //     throw new NotFoundException('El empleado no existe');
  //   }

  //   return employee;
  // }
}
