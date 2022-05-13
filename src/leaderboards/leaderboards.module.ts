import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Leaderboard, LeaderboardSchema } from 'src/schemas/leaderboard.schema';
import { LeaderboardsController } from './leaderboards.controller';
import { LeaderboardsService } from './leaderboards.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Leaderboard.name, schema: LeaderboardSchema },
    ]),
  ],
  providers: [LeaderboardsService],
  exports: [LeaderboardsService],
  controllers: [LeaderboardsController],
})
export class LeaderboardsModule {}
