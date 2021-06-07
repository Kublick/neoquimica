import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Doctor } from 'src/doctor/schemas/doctor.schema';
import { Patient } from 'src/patients/schemas/patients.schema';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order extends Document {
  @Prop()
  orden: string;
  @Prop()
  tipo: string;
  @Prop()
  fecha: Date;
  @Prop()
  horaEntrega: string;
  @Prop()
  horaMuestra: string;
  @Prop()
  age: number;
  @Prop()
  resultReceived: [];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' })
  patientReference: Patient;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' })
  medicoReference: Doctor;
  @Prop()
  currentStatus: string;
  // @Prop(
  //   raw({
  //     printed: { type: Boolean },
  //     email: { type: Boolean },
  //     toDoctor: { type: Boolean },
  //     Fax: { type: Boolean },
  //     Web: { type: Boolean },
  //   }),
  // )
  // resultsReception: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
