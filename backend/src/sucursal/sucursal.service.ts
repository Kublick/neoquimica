import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { Sucursal, SucursalDocument } from './schema/sucursal.schema';

@Injectable()
export class SucursalService {
  constructor(
    @InjectModel(Sucursal.name)
    private readonly sucursalModel: Model<SucursalDocument>,
  ) {}

  async createSucursal(
    createSucursalDto: CreateSucursalDto,
  ): Promise<Sucursal> {
    const { name } = createSucursalDto;

    try {
      const sucursal = new this.sucursalModel({
        name,
      });

      await sucursal.save();
      return;
    } catch (error) {
      throw new ConflictException('la sucursal ya existe');
    }
  }

  getAllSucursal(): Promise<Sucursal[]> {
    return this.sucursalModel.getAllSucursal();
  }

  deleteSucursalId(id: string): Promise<void> {
    return this.sucursalModel.deleteSucursalId(id);
  }
}
