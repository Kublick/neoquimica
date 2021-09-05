import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PrecioDocument = Precio & Document;

@Schema()
export class Precio extends Document {
  @Prop()
  codigo: string;
  @Prop()
  tipo: string;
  @Prop()
  nombre: string;
  @Prop()
  precio: number;
  @Prop()
  bundleItem: boolean;
}

export const PrecioSchema = SchemaFactory.createForClass(Precio);
