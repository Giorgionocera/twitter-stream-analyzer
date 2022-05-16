import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Author } from './author.schema';
import { AuthorBank, AuthorBankSchema } from './author-bank.schema';
import aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type LeaderboardDocument = Leaderboard & Document;

@Schema({ timestamps: true })
export class Leaderboard extends Author {
  @Prop({ type: [AuthorBankSchema], default: [] })
  banks: AuthorBank[];
}

const LeaderboardSchema = SchemaFactory.createForClass(Leaderboard);

LeaderboardSchema.plugin(aggregatePaginate);

export { LeaderboardSchema };
