import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetsService } from './tweets.service';
import { Tweet, TweetSchema } from 'src/schemas/tweet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
  ],
  providers: [TweetsService],
})
export class TweetsModule {}
