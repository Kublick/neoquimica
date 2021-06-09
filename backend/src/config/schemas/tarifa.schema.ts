import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TarifaDocument = Tarifa & Document;

@Schema()
export class Tarifa extends Document {
  @Prop()
  abreviatura: string;
  @Prop()
  descripcion: string;
  @Prop()
  isDefault: boolean;
}

export const TarifaSchema = SchemaFactory.createForClass(Tarifa);
