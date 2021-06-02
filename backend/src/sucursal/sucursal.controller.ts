import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Sucursal, SucursalDocument } from './schema/sucursal.schema';
import { SucursalService } from './sucursal.service';

@Controller('sucursal')
@UseGuards(AuthGuard())
export class SucursalController {
  constructor(
    @InjectModel(Sucursal.name)
    private readonly sucursalModel: Model<SucursalDocument>,
  ) {}

  @Get()
  getAllSucursal(): Promise<Sucursal[]> {
    return this.sucursalModel.getAllSucursal();
  }

  @Post()
  createSucursal(
    @Body() createSucursalDto: CreateSucursalDto,
  ): Promise<Sucursal> {
    return this.sucursalModel.createSucursal(createSucursalDto);
  }

  @Delete('/:id')
  deleteEmployeById(@Param('id') id: string): Promise<void> {
    return this.sucursalModel.deleteSucursalId(id);
  }
}
