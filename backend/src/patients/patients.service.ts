import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient, PatientDocument } from './schemas/patients.schema';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name)
    private readonly patientModel: Model<PatientDocument>,
  ) {}

  async createPatient(
    createPatientDto: CreatePatientDto,
    sucursal: string,
  ): Promise<Patient> {
    const {
      name,
      lastName,
      phone,
      gender,
      address,
      notes,
      email,
      birthDate,
      clienteRef,
    } = createPatientDto;

    //!Determinar valor que no se debe repetir

    const newShortId =
      name.substring(0, 2).toUpperCase() +
      lastName.substring(0, 2).toUpperCase() +
      birthDate.substring(0, 4) +
      birthDate.substring(5, 7) +
      birthDate.substring(8, 10);

    try {
      const patient = new this.patientModel({
        shortId: newShortId,
        name,
        lastName,
        birthDate: new Date(),
        phone,
        gender,
        email,
        address,
        notes,
        clienteRef,
        sucursalRef: sucursal,
      });

      await patient.save();
      return patient;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getPatientById(id: string): Promise<Patient> {
    try {
      const found = await this.patientModel.findById({ _id: id });
      if (!found) {
        throw new ConflictException('El paciente no existe');
      }
      return found;
    } catch (error) {
      throw new ConflictException('El paciente no existe');
    }
  }

  async getPatients(): Promise<Patient[]> {
    const found = await this.patientModel.find();
    if (!found) {
      throw new BadRequestException('communication error');
    }
    return found;
  }

  async deletePatient(id: string): Promise<void> {
    const found = await this.getPatientById(id);
    if (found) {
      await this.patientModel.findByIdAndDelete({ _id: id });
    }
  }

  async updatePatient(
    id: string,
    createPatientDto: CreatePatientDto,
  ): Promise<Patient> {
    try {
      const update = await this.patientModel.findByIdAndUpdate(
        { _id: id },
        { $set: createPatientDto },
      );
      return update;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
