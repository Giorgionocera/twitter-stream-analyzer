import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Snapshot, SnapshotSchema } from 'src/schemas/snapshot.schema';
import { Leaderboard, LeaderboardSchema } from 'src/schemas/leaderboard.schema';
import { SnapshotsCommand } from './snapshots.command';
import { SnapshotsService } from './snapshots.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Snapshot.name, schema: SnapshotSchema },
      { name: Leaderboard.name, schema: LeaderboardSchema },
    ]),
  ],
  providers: [SnapshotsService, SnapshotsCommand],
})
export class SnapshotsModule {}
