import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tweet, TweetDocument } from 'src/schemas/tweet.schema';
import { TwitterResponse } from 'src/interfaces';
import { TweetV2 } from 'twitter-api-v2';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet.name) private tweetModel: Model<TweetDocument>,
  ) {}

  async create(payload: TweetV2): Promise<Tweet> {
    const tweet = {
      id: payload.id,
      text: payload.text,
      createdAt: payload.created_at,
    };

    const createdTweet = new this.tweetModel(tweet);

    return createdTweet.save();
  }
}
