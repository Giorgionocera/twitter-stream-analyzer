import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { TweetsModule } from 'src/tweets/tweets.module';
import { TwitterService } from 'src/tweets/twitter.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  const twitterService = app
    .select(TweetsModule)
    .get(TwitterService, { strict: true });

  twitterService.getSearchStream();

  const config = new DocumentBuilder()
    .setTitle('Twitter Analyzer')
    .setDescription(
      'This is a twitter analyzer for bitsong testnet subscriptions.',
    )
    .setVersion('1.0')
    .addTag('bitsong')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.NODE_PORT ?? 3000);
}

bootstrap();
