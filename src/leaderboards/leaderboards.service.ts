import { AggregatePaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Leaderboard,
  LeaderboardDocument,
} from 'src/schemas/leaderboard.schema';
import { createSearchQuery } from 'src/utils';
import { SnapshotsService } from 'src/snapshosts/snapshots.service';

@Injectable()
export class LeaderboardsService {
  constructor(
    @InjectModel(Leaderboard.name)
    private leaderboardModel: AggregatePaginateModel<LeaderboardDocument>,
    private snapshotsService: SnapshotsService,
  ) {}

  async updateDisqualified(addresses: string[]) {
    await this.leaderboardModel.updateMany(
      {
        address: {
          $in: addresses,
        },
      },
      {
        $set: {
          disqualified: true,
        },
      },
    );
  }

  async find(limit = 10, page = 0, search?: string) {
    const query = createSearchQuery(search); // OR Query

    const aggregate = this.leaderboardModel.aggregate([
      {
        $match: query,
      },
      {
        $set: {
          lastCoins: {
            $last: '$banks.coins',
          },
        },
      },
      {
        $set: {
          balance: {
            $filter: {
              input: '$lastCoins',
              as: 'coin',
              cond: { $eq: ['$$coin.denom', 'ubtsg'] },
            },
          },
        },
      },
      { $unwind: '$balance' },
      {
        $set: {
          convertAmount: {
            $toDouble: '$balance.amount',
          },
        },
      },
      {
        $project: {
          banks: false,
          lastCoins: false,
        },
      },
    ]);

    const paginationResult = await this.leaderboardModel.aggregatePaginate(
      aggregate,
      {
        limit,
        page,
        sort: { disqualified: 0, convertAmount: -1 },
      },
    );

    const snapshot = await this.snapshotsService.findLatest();

    return {
      ...paginationResult,
      snapshotDate: snapshot.createdAt,
      blockHeight: snapshot.blockHeight,
    };
  }
}
