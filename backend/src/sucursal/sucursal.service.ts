import { Injectable } from '@nestjs/common';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { Sucursal } from './sucursal.entity';
import { SucursalRepository } from './sucursal.repository';

@Injectable()
export class SucursalService {
  constructor(private readonly sucursalRepository: SucursalRepository) {}

  createSucursal(createSucursalDto: CreateSucursalDto): Promise<Sucursal> {
    return this.sucursalRepository.createSucursal(createSucursalDto);
  }

  getAllSucursal(): Promise<Sucursal[]> {
    return this.sucursalRepository.getAllSucursal();
  }

  deleteSucursalId(id: string): Promise<void> {
    return this.sucursalRepository.deleteSucursalId(id);
  }
}
