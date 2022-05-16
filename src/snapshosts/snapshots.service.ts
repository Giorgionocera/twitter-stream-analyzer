import { Model, Types } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Snapshot, SnapshotDocument } from 'src/schemas/snapshot.schema';
import {
  Leaderboard,
  LeaderboardDocument,
} from 'src/schemas/leaderboard.schema';
import { Bank } from 'src/schemas/bank.schema';

@Injectable()
export class SnapshotsService {
  private readonly logger = new Logger(SnapshotsService.name);

  constructor(
    @InjectModel(Snapshot.name)
    private snapshotModel: Model<SnapshotDocument>,
    @InjectModel(Leaderboard.name)
    private leaderboardModel: Model<LeaderboardDocument>,
  ) {}

  async createSnapshot(banks: Bank[]) {
    try {
      const snapshotModel = await new this.snapshotModel({ banks }).save();
      const snapshotID = snapshotModel._id.toString();
      const snapshotObjectID = new Types.ObjectId(snapshotID);

      const result = await this.snapshotModel.aggregate([
        {
          $unwind: '$banks',
        },
        {
          $match: {
            _id: snapshotObjectID,
          },
        },
        {
          $lookup: {
            from: 'authors',
            localField: 'banks.address',
            foreignField: 'address',
            as: 'authors',
          },
        },
        {
          $project: {
            'banks.address': false,
            'banks._id': false,
          },
        },
        {
          $project: {
            banks: {
              $map: {
                input: { $objectToArray: '$banks' },
                in: { $arrayToObject: [['$$this']] },
              },
            },
            author: { $first: '$authors' },
          },
        },
        {
          $replaceWith: {
            $mergeObjects: ['$$ROOT', '$author'],
          },
        },
        {
          $project: {
            author: false,
            authors: false,
            _id: false,
            __v: false,
            createdAt: false,
            updatedAt: false,
          },
        },
      ]);

      for (const leaderboard of result) {
        const leaderboardCpy = { ...leaderboard };
        delete leaderboardCpy.banks;

        await this.leaderboardModel.findOneAndUpdate(
          {
            authorId: leaderboard.authorId,
          },
          {
            ...leaderboardCpy,
            $push: { banks: { $each: leaderboard.banks } },
          },
          {
            upsert: true,
          },
        );
      }

      return snapshotID;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
