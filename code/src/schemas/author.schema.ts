import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthorDocument = Author & Document;

@Schema()
export class Author {
  @Prop({ unique: true })
  authorId: string;

  @Prop()
  createdAt: string;

  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop({ unique: true })
  address: string; // User wallet address
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
