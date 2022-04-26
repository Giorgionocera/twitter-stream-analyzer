import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tweet, TweetDocument } from 'src/schemas/tweet.schema';
import { ApiV2Includes, TweetV2 } from 'twitter-api-v2';
import { mapTweet, searchValidAddress } from 'src/utils';
import { AuthorsService } from 'src/authors/authors.service';

@Injectable()
export class TweetsService {
  private readonly logger = new Logger(TweetsService.name);

  hashTags: string[] = JSON.parse(process.env.TWITTER_HASHTAG);
  mentions: string[] = JSON.parse(process.env.TWITTER_BITSONG_ACCOUNT);

  constructor(
    @InjectModel(Tweet.name) private tweetModel: Model<TweetDocument>,
    private authorsService: AuthorsService,
  ) {}

  async create(payload: TweetV2, includes: ApiV2Includes): Promise<Tweet> {
    this.logger.verbose(`fetching... id: ${payload.id}`);

    if (includes.users && payload.entities) {
      try {
        const bitsongAddress = searchValidAddress(payload.text);

        if (!bitsongAddress) {
          this.logger.verbose(`invalid address: ${payload.id}`);
          return;
        }

        const validHashtags = payload.entities.hashtags.filter((hashtag) =>
          this.hashTags.includes(hashtag.tag),
        );

        const validMentions = payload.entities.mentions.filter((mention) =>
          this.mentions.includes(mention.username),
        );

        const authorRaw = includes.users.find(
          (user) => user.id === payload.author_id,
        );

        const referenceTweet = payload.referenced_tweets.find(
          (tweet) =>
            tweet.id === process.env.TWITTER_TWEET_REFERENCE_ID &&
            tweet.type === 'quoted',
        );

        if (!referenceTweet) {
          this.logger.verbose(`Wrong reference tweet: ${payload.id}`);
          return;
        }

        if (
          authorRaw &&
          validHashtags.length === this.hashTags.length &&
          validMentions.length === this.mentions.length
        ) {
          const authorId = await this.authorsService.createOrUpdate(
            authorRaw,
            bitsongAddress,
          );

          const tweet: Tweet = mapTweet(payload, authorId);

          const createdTweet = new this.tweetModel(tweet);

          const tweetDocument = await createdTweet.save();

          return tweetDocument;
        } else {
          this.logger.verbose(`invalid tweet: ${payload.id}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
