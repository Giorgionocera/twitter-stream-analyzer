import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Bank, BankSchema } from './bank.schema';
import * as paginate from 'mongoose-paginate-v2';

export type SnapshotDocument = Snapshot & Document;

@Schema({ timestamps: true })
export class Snapshot {
  @Prop({ type: [BankSchema], default: [] })
  banks: Bank[];

  @Prop({ type: String, required: true })
  blockHeight: string;
}

const SnapshotSchema = SchemaFactory.createForClass(Snapshot);

SnapshotSchema.plugin(paginate);

export { SnapshotSchema };
