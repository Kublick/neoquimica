import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo/neoQuimica'),
    EmployeeModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
