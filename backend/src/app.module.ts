import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { SucursalModule } from './sucursal/sucursal.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientsModule } from './patients/patients.module';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo/neoQuimica'),
    EmployeeModule,
    AuthModule,
    SucursalModule,
    DoctorModule,
    PatientsModule,
    ClientesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
