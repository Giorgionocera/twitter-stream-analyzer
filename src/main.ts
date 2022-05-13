import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(new ValidationPipe());

  /* const twitterService = app
    .select(TweetsModule)
    .get(TwitterService, { strict: true });

  twitterService.getSearchStream().catch((error) => console.error(error)); */

  const config = new DocumentBuilder()
    .setTitle('Twitter Analyzer')
    .setDescription(
      'This is a twitter analyzer for bitsong testnet subscriptions.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.NODE_PORT ?? 3000);
}

bootstrap();
