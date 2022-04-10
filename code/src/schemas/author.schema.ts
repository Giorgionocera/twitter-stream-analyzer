import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthorDocument = Author & Document;

@Schema({ timestamps: true })
export class Author {
  @Prop({ unique: true })
  authorId: string;

  @Prop()
  twitterCreatedAt: string;

  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop({ unique: true })
  address: string; // User wallet address
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
