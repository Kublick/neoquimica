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
import { ObjectId } from 'mongoose';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Doctor } from './schemas/doctor.schema';

@Controller('doctor')
@UseGuards(AuthGuard())
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  getDoctors(): Promise<Doctor[]> {
    return this.doctorService.getDoctors();
  }

  @Post()
  createDoctor(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return this.doctorService.createDoctor(createDoctorDto);
  }

  @Delete('/:id')
  deleteDoctor(@Param('id') id: ObjectId): Promise<void> {
    return this.doctorService.deleteDoctor(id);
  }

  @Put('/:id')
  updateDoctor(
    @Param('id') id: string,
    createDoctorDto: CreateDoctorDto,
  ): Promise<Doctor> {
    return this.doctorService.updateDoctor(id, createDoctorDto);
  }
}
