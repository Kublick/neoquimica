import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/:id')
  getEmployeeById(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.getEmployeeById(id);
  }

  @Post()
  createNewEmployee(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.createEmployee(createEmployeeDto);
  }

  @Delete('/:id')
  deleteEmployeById(@Param('id') id: string): Promise<void> {
    return this.employeeService.deleteEmployeeById(id);
  }
}
