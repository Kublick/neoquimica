import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { CreateMetodoDto } from './dto/create-metodo.dto';
import { CreateMuestraDto } from './dto/create-muestra.dto';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { CreatePruebaDto } from './dto/create-prueba.dto';
import { CreateTarifaDto } from './dto/create-tarifa.dto';
import { Departamento } from './schemas/departamento.schema';
import { Metodo } from './schemas/metodo.schema';
import { Muestra } from './schemas/muesta.schema';
import { Perfil } from './schemas/perfil.schema';
import { Prueba } from './schemas/prueba.schema';
import { Tarifa } from './schemas/tarifa.schema';
import { Paquete } from './schemas/paquete.schema';
import { CreatePaqueteDto } from './dto/create-paquete.dto';
import { Precio } from './schemas/precio.schema';

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

  @Get('muestra')
  getMuestras(): Promise<Muestra[]> {
    return this.configService.getMuestras();
  }

  @Post('muestra')
  createMuestra(@Body() createMuestraDto: CreateMuestraDto): Promise<Muestra> {
    return this.configService.createMuestra(createMuestraDto);
  }

  @Put('muestra/:id')
  updateMuestra(
    @Param('id') id: string,
    @Body() createMuestraDto: CreateMuestraDto,
  ) {
    return this.configService.updateMuestra(id, createMuestraDto);
  }

  @Get('prueba')
  getPruebas(): Promise<Prueba[]> {
    return this.configService.getPruebas();
  }

  @Post('prueba')
  createPrueba(@Body() createPruebaDto: CreatePruebaDto): Promise<Prueba> {
    return this.configService.createPrueba(createPruebaDto);
  }

  @Put('prueba/:id')
  updatePrueba(
    @Param('id') id: string,
    @Body() createPruebaDto: CreatePruebaDto,
  ): Promise<void> {
    return this.configService.updatePrueba(id, createPruebaDto);
  }

  @Get('tarifa')
  getTarifas(): Promise<Tarifa[]> {
    return this.configService.getTarifas();
  }

  @Post('tarifa')
  createTarifa(@Body() createTarifaDto: CreateTarifaDto): Promise<Tarifa> {
    return this.configService.createTarifa(createTarifaDto);
  }

  @Put('tarifa/:id')
  updateTarifa(
    @Param('id') id: string,
    @Body() createTarifaDto: CreateTarifaDto,
  ): Promise<void> {
    return this.configService.updateTarifa(id, createTarifaDto);
  }

  @Get('perfil')
  getPerfiles(): Promise<Perfil[]> {
    return this.configService.getPerfiles();
  }

  @Post('perfil')
  createPerfil(@Body() createPerfilDto: CreatePerfilDto): Promise<Perfil> {
    return this.configService.createPerfil(createPerfilDto);
  }

  @Put('perfil/:id')
  updatePerfil(
    @Param('id') id: string,
    @Body() createPerfilDto: CreatePerfilDto,
  ): Promise<void> {
    return this.configService.updatePerfil(id, createPerfilDto);
  }

  @Get('paquete')
  getPaquetes(): Promise<Paquete[]> {
    return this.configService.getPaquetes();
  }

  @Post('paquete')
  createPaquete(@Body() createPaqueteDto: CreatePaqueteDto): Promise<Paquete> {
    return this.configService.createPaquete(createPaqueteDto);
  }

  @Put('paquete/:id')
  updatePaquete(
    @Param('id') id: string,
    @Body() createPaqueteDto: CreatePaqueteDto,
  ): Promise<void> {
    return this.configService.updatePaquete(id, createPaqueteDto);
  }

  @Get('precio')
  getPrecio(): Promise<Precio[]> {
    return this.configService.getPrecios();
  }
}
