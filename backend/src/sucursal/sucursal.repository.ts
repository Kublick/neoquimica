import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { Sucursal } from './sucursal.entity';

@EntityRepository(Sucursal)
export class SucursalRepository extends Repository<Sucursal> {
  async createSucursal(
    createSucursalDto: CreateSucursalDto,
  ): Promise<Sucursal> {
    const { name } = createSucursalDto;

    try {
      const sucursal = {
        name,
      };

      await this.save(sucursal);
      return;
    } catch (error) {
      throw new ConflictException('la sucursal ya existe');
    }
  }

  async getAllSucursal(): Promise<Sucursal[]> {
    const sucursales = await this.find();
    return sucursales;
  }

  deleteSucursalId(id: string): Promise<void> {
    this.delete(id);
    return;
  }
}
