import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { CreateMetodoDto } from './dto/create-metodo.dto';
import { CreateMuestraDto } from './dto/create-muestra.dto';
import { CreatePaqueteDto } from './dto/create-paquete.dto';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { CreatePruebaDto } from './dto/create-prueba.dto';
import { CreateTarifaDto } from './dto/create-tarifa.dto';
import {
  Departamento,
  DepartamentoDocument,
} from './schemas/departamento.schema';
import { Metodo, MetodoDocument } from './schemas/metodo.schema';
import { Muestra, MuestraDocument } from './schemas/muesta.schema';
import { Paquete, PaqueteDocument } from './schemas/paquete.schema';
import { Perfil, PerfilDocument } from './schemas/perfil.schema';
import { Prueba, PruebaDocument } from './schemas/prueba.schema';
import { Tarifa, TarifaDocument } from './schemas/tarifa.schema';

@Injectable()
export class ConfigService {
  constructor(
    @InjectModel('Metodo')
    private readonly metodoModel: Model<MetodoDocument>,
    @InjectModel('Departamento')
    private readonly departamentoModel: Model<DepartamentoDocument>,
    @InjectModel('Muestra')
    private readonly muestraModel: Model<MuestraDocument>,
    @InjectModel('Prueba')
    private readonly PruebaModel: Model<PruebaDocument>,
    @InjectModel('Tarifa')
    private readonly tarifaModel: Model<TarifaDocument>,
    @InjectModel('Perfil')
    private readonly perfilModel: Model<PerfilDocument>,
    @InjectModel('Paquete')
    private readonly paqueteModel: Model<PaqueteDocument>,
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
      await this.departamentoModel.findByIdAndUpdate(
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
      await this.muestraModel.findByIdAndUpdate(
        { _id: id },
        { $set: createMuestraDto },
      );
      return;
    } catch (error) {
      console.log(error);
    }
  }

  async createPrueba(createPruebaDto: CreatePruebaDto): Promise<Prueba> {
    try {
      const prueba = new this.PruebaModel({
        ...createPruebaDto,
      });
      await prueba.save();
      return prueba;
    } catch (error) {
      throw new BadRequestException('Hubo un error');
    }
  }

  async getPruebas(): Promise<Prueba[]> {
    const found = await this.PruebaModel.find();
    return found;
  }

  async updatePrueba(
    id: string,
    createPruebaDto: CreatePruebaDto,
  ): Promise<void> {
    try {
      await this.PruebaModel.findByIdAndUpdate(
        { _id: id },
        { $set: createPruebaDto },
      );
      return;
    } catch (error) {
      console.log(error);
    }
  }

  async createTarifa(createTarifaDto: CreateTarifaDto): Promise<Tarifa> {
    try {
      const tarifa = new this.tarifaModel({
        ...createTarifaDto,
      });
      await tarifa.save();
      return tarifa;
    } catch (error) {
      throw new BadRequestException('Hubo un error');
    }
  }

  async getTarifas(): Promise<Tarifa[]> {
    const found = this.tarifaModel.find();
    return found;
  }

  async updateTarifa(id: string, createTarifaDto): Promise<void> {
    try {
      await this.tarifaModel.findByIdAndUpdate(
        { _id: id },
        { $set: createTarifaDto },
      );
      return;
    } catch (error) {
      console.log(error);
    }
  }

  async createPerfil(createPerfilDto: CreatePerfilDto): Promise<Perfil> {
    try {
      const perfil = new this.perfilModel({
        ...createPerfilDto,
      });
      await perfil.save();
      return perfil;
    } catch (error) {
      throw new BadRequestException('Hubo un error');
    }
  }

  async getPerfiles(): Promise<Perfil[]> {
    const found = await this.perfilModel.find();
    return found;
  }

  async updatePerfil(
    id: string,
    createPerfilDto: CreatePerfilDto,
  ): Promise<void> {
    try {
      await this.perfilModel.findByIdAndUpdate(
        { _id: id },
        { $set: createPerfilDto },
      );
      return;
    } catch (error) {
      console.log(error);
    }
  }

  async createPaquete(createPaqueteDto: CreatePaqueteDto): Promise<Paquete> {
    try {
      const paquete = new this.paqueteModel({
        ...createPaqueteDto,
      });

      await paquete.save();
      return paquete;
    } catch (error) {
      throw new BadRequestException('Hubo un error');
    }
  }

  async getPaquetes(): Promise<Paquete[]> {
    return this.paqueteModel.find();
  }

  async updatePaquete(
    id: string,
    createPaqueteDto: CreatePaqueteDto,
  ): Promise<void> {
    try {
      await this.paqueteModel.findByIdAndUpdate(
        { _id: id },
        { $set: createPaqueteDto },
      );
      return;
    } catch (error) {
      throw new BadRequestException('Hubo un error');
    }
  }
}
