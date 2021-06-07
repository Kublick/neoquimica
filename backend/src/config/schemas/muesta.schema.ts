import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MuestraDocument = Muestra & Document;

@Schema()
export class Muestra extends Document {
  @Prop()
  clave: string;
  @Prop()
  descripcion: string;
  @Prop()
  nombreTubo: string;
  @Prop()
  observaciones: string;
  @Prop()
  codigo: string;
  @Prop()
  excluirStatus: string;
}

export const MuestraSchema = SchemaFactory.createForClass(Muestra);
