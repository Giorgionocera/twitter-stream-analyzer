import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { TweetsModule } from 'src/tweets/tweets.module';
import { TweetsService } from 'src/tweets/tweets.service';
import { TwitterService } from 'src/tweets/twitter.service';
import { take, tap } from 'rxjs';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  const tweetsService = app
    .select(TweetsModule)
    .get(TweetsService, { strict: true });

  const twitterService = app
    .select(TweetsModule)
    .get(TwitterService, { strict: true });

  twitterService.getSearchStream();

  console.log('START');
}

bootstrap();
