import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Balance, BalanceSchema } from './balance.schema';

export type AuthorBankDocument = AuthorBank & Document;

@Schema({ timestamps: true, _id: false })
export class AuthorBank {
  @Prop({ type: [BalanceSchema], default: [] })
  coins: Balance[];
}

const AuthorBankSchema = SchemaFactory.createForClass(AuthorBank);

export { AuthorBankSchema };
