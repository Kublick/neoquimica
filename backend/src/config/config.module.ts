import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Metodo, MetodoSchema } from './schemas/metodo.schema';
import {
  Departamento,
  DepartamentoSchema,
} from './schemas/departamento.schema';

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
  ],
  providers: [ConfigService],
  controllers: [ConfigController],
})
export class ConfigModule {}
