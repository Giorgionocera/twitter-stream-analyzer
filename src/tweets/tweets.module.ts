import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetsService } from './tweets.service';
import { Tweet, TweetSchema } from 'src/schemas/tweet.schema';
import { TwitterService } from './twitter.service';
import { Author, AuthorSchema } from 'src/schemas/author.schema';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  imports: [
    AuthorsModule,
    MongooseModule.forFeature([
      { name: Tweet.name, schema: TweetSchema },
      { name: Author.name, schema: AuthorSchema },
    ]),
  ],
  providers: [TweetsService, TwitterService],
})
export class TweetsModule {}
