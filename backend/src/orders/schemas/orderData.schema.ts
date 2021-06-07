import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDataDocument = OrderData & Document;

@Schema()
export class OrderData extends Document {
  @Prop()
  sucId: string;
  @Prop()
  consec: number;
}

export const OrderDataSchema = SchemaFactory.createForClass(OrderData);
