import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BitsongModule } from 'src/bitsong/bitsong.module';
import { Leaderboard, LeaderboardSchema } from 'src/schemas/leaderboard.schema';
import { SnapshotsModule } from 'src/snapshosts/snapshots.module';
import { LeaderboardsCommand } from './leaderboards.command';
import { LeaderboardsController } from './leaderboards.controller';
import { LeaderboardsService } from './leaderboards.service';

@Module({
  imports: [
    BitsongModule,
    SnapshotsModule,
    MongooseModule.forFeature([
      { name: Leaderboard.name, schema: LeaderboardSchema },
    ]),
  ],
  providers: [LeaderboardsService, LeaderboardsCommand],
  exports: [LeaderboardsService],
  controllers: [LeaderboardsController],
})
export class LeaderboardsModule {}
