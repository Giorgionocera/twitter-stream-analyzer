import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Snapshot, SnapshotDocument } from 'src/schemas/snapshot.schema';
import { Bank } from 'src/schemas/bank.schema';

@Injectable()
export class SnapshotsService {
  private readonly logger = new Logger(SnapshotsService.name);

  constructor(
    @InjectModel(Snapshot.name) private snapshotModel: Model<SnapshotDocument>,
  ) {}

  async createSnapshot(banks: Bank[]) {
    try {
      const snapshotModel = await new this.snapshotModel({ banks }).save();

      return snapshotModel._id.toString();
    } catch (error) {
      this.logger.error(error);
    }
  }
}
