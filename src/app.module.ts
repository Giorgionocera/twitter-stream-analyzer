import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TweetsModule } from 'src/tweets/tweets.module';
import { AuthorsModule } from 'src/authors/authors.module';
import { SnapshotsModule } from 'src/snapshosts/snapshots.module';
import { LeaderboardsModule } from 'src/leaderboards/leaderboards.module';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_HOST, {
      dbName: process.env.MONGODB_DB_NAME,
      user: process.env.MONGODB_USERNAME,
      pass: process.env.MONGODB_PASSWORD,
    }),
    AuthorsModule,
    TweetsModule,
    SnapshotsModule,
    LeaderboardsModule,
    CommandModule,
  ],
})
export class AppModule {}
