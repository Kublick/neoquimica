import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Cliente } from 'src/clientes/schemas/clientes.schema';
import * as mongoose from 'mongoose';
import { Sucursal } from 'src/sucursal/schema/sucursal.schema';

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
  birthDate: string;
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
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' })
  clienteRef: Cliente;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Sucursal' })
  sucursalRef: Sucursal;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);

//reference: { type: Schema.Types.ObjectId, ref: "Orders" },
//	sucursalRef: { type: Schema.Types.ObjectId, ref: "sucursal" },
