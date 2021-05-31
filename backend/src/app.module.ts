import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './employee/employee.entity';
import { AuthModule } from './auth/auth.module';
import { SucursalModule } from './sucursal/sucursal.module';
import { Sucursal } from './sucursal/sucursal.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://mongo/neoQuimica',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Employee, Sucursal],
    }),
    EmployeeModule,
    AuthModule,
    SucursalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
