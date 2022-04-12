import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tweet, TweetDocument } from 'src/schemas/tweet.schema';
import { ApiV2Includes, TweetV2 } from 'twitter-api-v2';
import { mapTweet, searchValidAddress } from 'src/utils';
import { AuthorsService } from 'src/authors/authors.service';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet.name) private tweetModel: Model<TweetDocument>,
    private authorsService: AuthorsService,
  ) {}

  async create(payload: TweetV2, includes: ApiV2Includes): Promise<Tweet> {
    console.log('fetching... id: ', payload.id);

    if (includes.users && payload.entities) {
      try {
        const bitsongAddress = searchValidAddress(payload.text);

        if (!bitsongAddress) {
          console.log('invalid address');
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
          const authorId = await this.authorsService.createOrUpdate(
            authorRaw,
            bitsongAddress,
          );

          const tweet: Tweet = mapTweet(payload, authorId);

          const createdTweet = new this.tweetModel(tweet);

          const tweetDocument = await createdTweet.save();

          return tweetDocument;
        } else {
          console.log('invalid tweet');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
