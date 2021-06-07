import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DepartamentoDocument = Departamento & Document;

@Schema()
export class Departamento extends Document {
  @Prop()
  descripcion: string;
}

export const DepartamentoSchema = SchemaFactory.createForClass(Departamento);
