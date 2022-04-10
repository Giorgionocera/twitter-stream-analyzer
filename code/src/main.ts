import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { TweetsModule } from 'src/tweets/tweets.module';
import { TwitterService } from 'src/tweets/twitter.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  const twitterService = app
    .select(TweetsModule)
    .get(TwitterService, { strict: true });

  twitterService.getSearchStream();
}

bootstrap();
