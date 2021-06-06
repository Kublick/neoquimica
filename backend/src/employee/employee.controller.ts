import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetEmployee } from 'src/auth/get-user.decorator';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './employee.service';
import { Employee } from './schemas/employee.schema';

@Controller('employee')
@UseGuards(AuthGuard())
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

  //Example how to get info from the us
  @Post('test')
  test(
    @GetEmployee('sucursal') sucursal: string,
    @GetEmployee('name') name: string,
  ) {
    console.log('employee', sucursal);
    console.log(name);
  }
}
