import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Snapshot, SnapshotSchema } from 'src/schemas/snapshot.schema';
import { SnapshotsCommand } from './snapshots.command';
import { SnapshotsService } from './snapshots.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Snapshot.name, schema: SnapshotSchema },
    ]),
  ],
  providers: [SnapshotsService, SnapshotsCommand],
})
export class SnapshotsModule {}
