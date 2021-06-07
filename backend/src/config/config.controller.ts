import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { CreateMetodoDto } from './dto/create-metodo.dto';
import { Departamento } from './schemas/departamento.schema';
import { Metodo } from './schemas/metodo.schema';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get('metodo')
  getMetodos(): Promise<Metodo[]> {
    return this.configService.getMetodos();
  }

  @Post('metodo')
  createMetodo(@Body() createMetodoDto: CreateMetodoDto): Promise<Metodo> {
    return this.configService.createMetodo(createMetodoDto);
  }

  @Put('metodo/:id')
  updateMetodo(
    @Param('id') id: string,
    @Body() createMetodoDto: CreateMetodoDto,
  ): Promise<void> {
    return this.configService.updateMetodo(id, createMetodoDto);
  }

  @Get('departamento')
  getDepartamentos(): Promise<Departamento[]> {
    return this.configService.getDepartamentos();
  }

  @Post('departamento')
  createDepartamento(
    @Body() createDepartamentoDto: CreateDepartamentoDto,
  ): Promise<Departamento> {
    return this.configService.createDepartamento(createDepartamentoDto);
  }

  @Put('departamento/:id')
  updateDepartamento(
    @Param('id') id: string,
    @Body() createDepartamentoDto: CreateDepartamentoDto,
  ): Promise<void> {
    return this.configService.updateDepartamento(id, createDepartamentoDto);
  }
}
