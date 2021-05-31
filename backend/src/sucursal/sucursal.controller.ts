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
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { Sucursal } from './sucursal.entity';
import { SucursalService } from './sucursal.service';

@Controller('sucursal')
@UseGuards(AuthGuard())
export class SucursalController {
  constructor(private readonly sucursalService: SucursalService) {}

  @Get()
  getAllSucursal(): Promise<Sucursal[]> {
    return this.sucursalService.getAllSucursal();
  }

  @Post()
  createSucursal(
    @Body() createSucursalDto: CreateSucursalDto,
  ): Promise<Sucursal> {
    return this.sucursalService.createSucursal(createSucursalDto);
  }

  @Delete('/:id')
  deleteEmployeById(@Param('id') id: string): Promise<void> {
    return this.sucursalService.deleteSucursalId(id);
  }
}
