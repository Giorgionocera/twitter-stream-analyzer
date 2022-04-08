import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TweetsModule } from 'src/tweets/tweets.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/stream-analyzer'),
    ConfigModule.forRoot(),
    TweetsModule,
  ],
})
export class AppModule {}
