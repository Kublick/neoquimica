import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PruebaDocument = Prueba & Document;

@Schema()
export class Prueba extends Document {
  @Prop()
  codigo: string;
  @Prop()
  abreviatura: string;
  @Prop()
  descripcion: string;
  @Prop()
  titulo: string;
  @Prop()
  departamento: string;
  @Prop()
  tipoMuestra: string;
  @Prop()
  metodo: string;
  @Prop()
  print: string;
  @Prop()
  formula: string;
  @Prop()
  boldText: string;
  @Prop()
  ventaIndividual: boolean;
  @Prop()
  antibiograma: boolean;
  @Prop()
  unidades: string;
  @Prop()
  precio: number;
  @Prop()
  sexo: string;
  @Prop()
  tipoResultado: string;
  @Prop()
  decimales: number;
  @Prop()
  tiempoProceso: string;
  @Prop()
  indicaciones: string;
  @Prop()
  notas: string;
  @Prop()
  notasInternas: string;
  @Prop()
  tipoValorNormalidad: string;
  @Prop()
  valoresRango: [];
  @Prop()
  valorNormalidadTexto: string;
}

export const PruebaSchema = SchemaFactory.createForClass(Prueba);
