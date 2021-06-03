import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PatientDocument = Patient & Document;

@Schema()
export class Patient extends Document {
  @Prop()
  shortId: string;
  @Prop()
  name: string;
  @Prop()
  lastName: string;
  @Prop()
  birthDate: Date;
  @Prop()
  phone: string;
  @Prop()
  email: string;
  @Prop()
  orders: [];
  @Prop()
  gender: string;
  @Prop()
  address: string;
  @Prop()
  notes: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);

//reference: { type: Schema.Types.ObjectId, ref: "Orders" },
//	clientRef: { type: Schema.Types.ObjectId, ref: "cliente" },
//	sucursalRef: { type: Schema.Types.ObjectId, ref: "sucursal" },
