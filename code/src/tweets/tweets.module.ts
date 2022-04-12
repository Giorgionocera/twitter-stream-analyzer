import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetsService } from './tweets.service';
import { Tweet, TweetSchema } from 'src/schemas/tweet.schema';
import { TwitterService } from './twitter.service';
import { Author, AuthorSchema } from 'src/schemas/author.schema';
import { AuthorsService } from './authors.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tweet.name, schema: TweetSchema },
      { name: Author.name, schema: AuthorSchema },
    ]),
  ],
  providers: [TweetsService, TwitterService, AuthorsService],
})
export class TweetsModule {}
