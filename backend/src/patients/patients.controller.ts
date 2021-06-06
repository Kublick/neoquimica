import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetEmployee } from 'src/auth/get-user.decorator';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientsService } from './patients.service';
import { Patient } from './schemas/patients.schema';

@Controller('patients')
@UseGuards(AuthGuard())
export class PatientsController {
  constructor(private readonly patientService: PatientsService) {}

  @Get('/:id')
  getPatientById(@Param('id') id: string): Promise<Patient> {
    return this.patientService.getPatientById(id);
  }

  @Get()
  getPatients(): Promise<Patient[]> {
    return this.patientService.getPatients();
  }

  @Post()
  createPatient(
    @GetEmployee('sucursal') sucursal: string,
    @Body() createPatientDto: CreatePatientDto,
  ): Promise<Patient> {
    return this.patientService.createPatient(createPatientDto, sucursal);
  }

  @Delete('/:id')
  deletePatient(@Param('id') id: string): Promise<void> {
    return this.patientService.deletePatient(id);
  }

  @Put('/:id')
  updatePatient(
    @Param('id') id: string,
    @Body() createPatientDto: CreatePatientDto,
  ): Promise<Patient> {
    return this.patientService.updatePatient(id, createPatientDto);
  }
}
