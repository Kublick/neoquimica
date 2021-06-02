import { Module } from '@nestjs/common';
import { SucursalService } from './sucursal.service';
import { SucursalController } from './sucursal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SucursalRepository } from './sucursal.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SucursalRepository])],
  providers: [SucursalService],
  controllers: [SucursalController],
})
export class SucursalModule {}
