import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Doctor, DoctorDocument } from './schemas/doctor.schema';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<DoctorDocument>,
  ) {}

  async getDoctors(): Promise<Doctor[]> {
    return await this.doctorModel.find();
  }

  async getDoctorByEmail(email: string): Promise<Doctor> {
    const found = await this.doctorModel.findOne({ email });
    return found;
  }

  async createDoctor(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const { name, career, phone, email } = createDoctorDto;

    const found = this.getDoctorByEmail(email);

    if (found) {
      throw new ConflictException('El doctor ya existe');
    }

    try {
      const doctor = new this.doctorModel({
        name,
        career,
        phone,
        email,
        registeredOn: new Date(),
      });
      await doctor.save();
      return doctor;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async deleteDoctor(id: ObjectId): Promise<void> {
    try {
      await this.doctorModel.findOneAndDelete({ _id: id });
    } catch (error) {
      throw new ConflictException('El doctor no existe');
    }
  }

  async updateDoctor(
    id: string,
    createDoctorDto: CreateDoctorDto,
  ): Promise<Doctor> {
    const update = await this.doctorModel.findByIdAndUpdate(
      { _id: id },
      { $set: createDoctorDto },
    );
    return update;
  }
}
