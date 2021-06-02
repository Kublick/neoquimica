import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee extends Document {
  @Prop()
  name: string;
  @Prop()
  password: string;
  @Prop()
  email: string;
  @Prop()
  sucursal: string;
  @Prop()
  role: string;
  @Prop()
  registeredOn: Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
