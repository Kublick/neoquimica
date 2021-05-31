import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './employee/employee.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://mongo/neoQuimica',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Employee],
    }),
    EmployeeModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
