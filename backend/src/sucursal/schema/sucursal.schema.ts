import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SucursalDocument = Sucursal & Document;

@Schema()
export class Sucursal extends Document {
  @Prop()
  name: string;
}

export const SucursalSchema = SchemaFactory.createForClass(Sucursal);
