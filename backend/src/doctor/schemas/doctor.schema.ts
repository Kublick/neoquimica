import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DoctorDocument = Doctor & Document;

@Schema()
export class Doctor extends Document {
  @Prop()
  name: string;
  @Prop()
  phone: string;
  @Prop()
  career: string;
  @Prop()
  email: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
