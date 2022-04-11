import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type TweetDocument = Tweet & Document;

@Schema({ timestamps: true })
export class Tweet {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Author' })
  author: string;

  @Prop({ required: true })
  tweetCreatedAt: string;

  @Prop({ required: true })
  text: string;
}

export const TweetSchema = SchemaFactory.createForClass(Tweet);
