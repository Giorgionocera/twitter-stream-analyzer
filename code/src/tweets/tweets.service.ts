import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tweet, TweetDocument } from 'src/schemas/tweet.schema';
import { ApiV2Includes, TweetV2 } from 'twitter-api-v2';
import { Author, AuthorDocument } from 'src/schemas/author.schema';
import { mapAuthor, mapTweet, searchValidAddress } from 'src/utils';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet.name) private tweetModel: Model<TweetDocument>,
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async create(payload: TweetV2, includes: ApiV2Includes): Promise<Tweet> {
    if (includes.users && payload.entities) {
      try {
        const bitsongAddress = searchValidAddress(payload.text);

        if (!bitsongAddress) {
          return;
        }

        const validHashtag = payload.entities.hashtags.find(
          (hashtag) => hashtag.tag === process.env.TWITTER_HASHTAG,
        );

        const validMention = payload.entities.mentions.find(
          (mention) => mention.username === process.env.TWITTER_BITSONG_ACCOUNT,
        );

        const authorRaw = includes.users.find(
          (user) => user.id === payload.author_id,
        );

        if (authorRaw && validHashtag && validMention) {
          const author: Author = mapAuthor(authorRaw, bitsongAddress);

          const authorModel = await new this.authorModel(author).save();

          const tweet: Tweet = mapTweet(payload, authorModel._id.toString());

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
