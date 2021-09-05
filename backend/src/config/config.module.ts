import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Metodo, MetodoSchema } from './schemas/metodo.schema';
import {
  Departamento,
  DepartamentoSchema,
} from './schemas/departamento.schema';
import { Muestra, MuestraSchema } from './schemas/muesta.schema';
import { Prueba, PruebaSchema } from './schemas/prueba.schema';
import { Tarifa, TarifaSchema } from './schemas/tarifa.schema';
import { Perfil, PerfilSchema } from './schemas/perfil.schema';
import { Paquete, PaqueteSchema } from './schemas/paquete.schema';
import { Precio, PrecioSchema } from './schemas/precio.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Metodo.name,
        schema: MetodoSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Departamento.name,
        schema: DepartamentoSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Muestra.name,
        schema: MuestraSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Prueba.name,
        schema: PruebaSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Tarifa.name,
        schema: TarifaSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Perfil.name,
        schema: PerfilSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Paquete.name,
        schema: PaqueteSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Precio.name,
        schema: PrecioSchema,
      },
    ]),
  ],
  providers: [ConfigService],
  controllers: [ConfigController],
})
export class ConfigModule {}
