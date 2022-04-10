import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tweet, TweetDocument } from 'src/schemas/tweet.schema';
import { ApiV2Includes, TweetV2 } from 'twitter-api-v2';
import { Author, AuthorDocument } from 'src/schemas/author.schema';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet.name) private tweetModel: Model<TweetDocument>,
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async create(payload: TweetV2, includes: ApiV2Includes): Promise<Tweet> {
    if (includes.users) {
      try {
        const authorRaw = includes.users.find(
          (user) => user.id === payload.author_id,
        );

        if (authorRaw) {
          const author: Author = {
            authorId: authorRaw.id,
            twitterCreatedAt: authorRaw.created_at,
            name: authorRaw.name,
            username: authorRaw.username,
            address: authorRaw.id + 'TEST',
          };

          const authorModel = await new this.authorModel(author).save();

          const tweet: Tweet = {
            id: payload.id,
            text: payload.text,
            tweetCreatedAt: payload.created_at,
            author: authorModel._id.toString(),
          };

          const createdTweet = new this.tweetModel(tweet);

          const tweetDocument = await createdTweet.save();

          return tweetDocument;
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
