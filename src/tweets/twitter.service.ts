import { isBetweenStartEnd } from 'src/utils';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwitterApi } from 'twitter-api-v2';
import { TweetsService } from './tweets.service';

@Injectable()
export class TwitterService {
  private readonly logger = new Logger(TwitterService.name);

  twitterClient: TwitterApi;

  constructor(private config: ConfigService, private mongo: TweetsService) {
    this.twitterClient = new TwitterApi(
      this.config.get('TWITTER_BEARER_TOKEN'),
    );
  }

  async getSearchStream() {
    this.logger.verbose('Starting twitter search stream...');

    const stream = this.twitterClient.v2.searchStream({
      expansions: [
        'author_id',
        'entities.mentions.username',
        'referenced_tweets.id',
      ],
      'tweet.fields': [
        'created_at',
        'text',
        'author_id',
        'referenced_tweets',
        'entities',
        'context_annotations',
      ],
      'user.fields': [
        'created_at',
        'profile_image_url',
        'username',
        'location',
        'entities',
      ],
      autoConnect: false,
    });

    await stream.connect({
      autoReconnect: true,
      autoReconnectRetries: Infinity,
      keepAliveTimeout: Infinity,
    });

    for await (const { data, includes } of stream) {
      if (
        isBetweenStartEnd(
          process.env.ANALYZER_START_DATE,
          process.env.ANALYZER_END_DATE,
          data.created_at,
        )
      ) {
        this.mongo.create(data, includes);
      } else {
        this.logger.verbose('Out of env dates range, exit...');
        break;
      }
    }
  }
}
