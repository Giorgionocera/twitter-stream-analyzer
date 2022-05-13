import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BalanceDocument = Balance & Document;

@Schema({ _id: false })
export class Balance {
  @Prop({ type: String, required: true })
  amount: string;

  @Prop({ type: String, required: true })
  denom: string;
}

export const BalanceSchema = SchemaFactory.createForClass(Balance);
