import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tweet, TweetDocument } from 'src/schemas/tweet.schema';
import { TwitterResponse } from 'src/interfaces';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet.name) private tweetModel: Model<TweetDocument>,
  ) {}

  async create(payload: TwitterResponse): Promise<Tweet> {
    const tweet = {
      id: payload.data.id,
      text: payload.data.text,
      createdAt: payload.data.created_at,
    };

    const createdTweet = new this.tweetModel(tweet);

    return createdTweet.save();
  }
}
