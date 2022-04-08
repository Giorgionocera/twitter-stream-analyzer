import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Author } from 'src/schemas/author.schema';

export type TweetDocument = Tweet & Document;

@Schema()
export class Tweet {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Author' })
  author: Author;

  @Prop({ required: true })
  createdAt: string;

  @Prop({ required: true })
  text: string;
}

export const TweetSchema = SchemaFactory.createForClass(Tweet);
