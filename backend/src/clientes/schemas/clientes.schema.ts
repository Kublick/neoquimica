import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClienteDocument = Cliente & Document;

@Schema()
export class Cliente extends Document {
  @Prop({ unique: true })
  shortId: string;
  @Prop()
  nombre: string;
  @Prop()
  tarifa: string;
  @Prop()
  email: string;
  @Prop()
  telefono: string;
  @Prop()
  direccion: string;
  @Prop()
  tipoPago: string;
  @Prop()
  rfc: string;
  @Prop()
  notes: string;
  @Prop()
  envio: [];
  @Prop()
  webLabLogin: string;
  @Prop()
  webLabPassword: string;
  @Prop()
  listaPrecios: [];
  @Prop()
  createdAt: Date;
}

export const ClienteSchema = SchemaFactory.createForClass(Cliente);
