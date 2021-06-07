import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { CreateMetodoDto } from './dto/create-metodo.dto';
import { CreateMuestraDto } from './dto/create-muestra.dto';
import {
  Departamento,
  DepartamentoDocument,
} from './schemas/departamento.schema';
import { Metodo, MetodoDocument } from './schemas/metodo.schema';
import { Muestra, MuestraDocument } from './schemas/muesta.schema';

@Injectable()
export class ConfigService {
  constructor(
    @InjectModel('Metodo')
    private readonly metodoModel: Model<MetodoDocument>,
    @InjectModel('Departamento')
    private readonly departamentoModel: Model<DepartamentoDocument>,
    @InjectModel('Muestra')
    private readonly muestraModel: Model<MuestraDocument>,
  ) {}

  async createMetodo(createMetodoDto: CreateMetodoDto): Promise<Metodo> {
    try {
      const metodo = new this.metodoModel({
        ...createMetodoDto,
      });

      metodo.save();
      return metodo;
    } catch (error) {
      throw new BadRequestException('Ocurrio un error');
    }
  }

  async getMetodos(): Promise<Metodo[]> {
    return await this.metodoModel.find();
  }

  async updateMetodo(
    id: string,
    createMetodoDto: CreateMetodoDto,
  ): Promise<void> {
    try {
      await this.metodoModel.findOneAndUpdate(
        { _id: id },
        { $set: createMetodoDto },
      );
      return;
    } catch (error) {
      throw new BadRequestException('Ocurrio un error');
    }
  }

  async createDepartamento(
    createDepartamentoDto: CreateDepartamentoDto,
  ): Promise<Departamento> {
    try {
      const departamento = new this.departamentoModel({
        ...createDepartamentoDto,
      });

      await departamento.save();
      return departamento;
    } catch (error) {
      throw new BadRequestException('Hubo un error');
    }
  }

  async getDepartamentos(): Promise<Departamento[]> {
    return this.departamentoModel.find();
  }

  async updateDepartamento(
    id: string,
    createDepartamentoDto: CreateDepartamentoDto,
  ): Promise<void> {
    try {
      const update = await this.departamentoModel.findByIdAndUpdate(
        { _id: id },
        { $set: createDepartamentoDto },
      );
      return;
    } catch (error) {
      console.log(error);
    }
  }

  async createMuestra(createMuestraDto: CreateMuestraDto): Promise<Muestra> {
    try {
      const muestra = new this.muestraModel({
        ...createMuestraDto,
      });

      muestra.save();
      return muestra;
    } catch (error) {
      throw new BadRequestException('Hubo un error');
    }
  }

  async getMuestras(): Promise<Muestra[]> {
    return this.muestraModel.find();
  }

  async updateMuestra(
    id: string,
    createMuestraDto: CreateMuestraDto,
  ): Promise<void> {
    try {
      const update = await this.muestraModel.findByIdAndUpdate(
        { _id: id },
        { $set: createMuestraDto },
      );
      return;
    } catch (error) {
      console.log(error);
    }
  }
}
