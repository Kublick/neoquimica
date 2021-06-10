import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PerfilDocument = Perfil & Document;

@Schema()
export class Perfil extends Document {
  @Prop()
  codigo: string;
  @Prop()
  abreviatura: string;
  @Prop()
  descripcion: string;
  @Prop()
  titulo: string;
  @Prop()
  metodo: string;
  @Prop()
  sexo: string;
  @Prop()
  notas: string;
  @Prop()
  indicaciones: string;
  @Prop()
  notasInternas: string;
  @Prop()
  alineacionTitulo: string;
  @Prop()
  colorTitulo: string;
  @Prop(0)
  ventaIndividual: string;
  @Prop()
  precio: number;
  @Prop()
  bundle: [];
}

export const PerfilSchema = SchemaFactory.createForClass(Perfil);
