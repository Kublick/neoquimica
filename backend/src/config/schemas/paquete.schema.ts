import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaqueteDocument = Paquete & Document;

@Schema()
export class Paquete extends Document {
  @Prop()
  abreviatura: string;
  @Prop()
  descripcion: string;
  @Prop()
  indicaciones: string;
  @Prop()
  notasInternas: string;
  @Prop()
  bundle: [];
  @Prop()
  precio: number;
}

export const PaqueteSchema = SchemaFactory.createForClass(Paquete);
