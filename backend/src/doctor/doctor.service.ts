import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from './schemas/doctor.schema';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<DoctorDocument>,
  ) {}

  async getDoctors() {
    this.doctorModel.find();
  }
}
