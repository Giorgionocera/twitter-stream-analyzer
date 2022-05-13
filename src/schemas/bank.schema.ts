import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Balance, BalanceSchema } from './balance.schema';

export type BankDocument = Bank & Document;

@Schema()
export class Bank {
  @Prop({ required: true, unique: true, index: true })
  address: string;

  @Prop({ type: [BalanceSchema], default: [] })
  coins: Balance[];
}

const BankSchema = SchemaFactory.createForClass(Bank);

export { BankSchema };
