import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MetodoDocument = Metodo & Document;

@Schema()
export class Metodo extends Document {
  @Prop()
  descripcion: string;
}

export const MetodoSchema = SchemaFactory.createForClass(Metodo);
