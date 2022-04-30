import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from 'src/schemas/author.schema';
import { AuthorsController } from 'src/authors/authors.controller';
import { AuthorsService } from 'src/authors/authors.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
  ],
  providers: [AuthorsService],
  exports: [AuthorsService],
  controllers: [AuthorsController],
})
export class AuthorsModule {}
