import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Sucursal, SucursalSchema } from './schema/sucursal.schema';
import { SucursalController } from './sucursal.controller';
import { SucursalService } from './sucursal.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Sucursal.name,
        schema: SucursalSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [SucursalController],
  providers: [SucursalService],
})
export class SucursalModule {}
