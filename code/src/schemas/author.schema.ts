import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthorDocument = Author & Document;

@Schema({ timestamps: true })
export class Author {
  @Prop({ unique: true })
  authorId: string;

  @Prop({ required: true })
  twitterCreatedAt: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ unique: true })
  address: string; // User wallet address

  @Prop({ required: true })
  valid: boolean;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
