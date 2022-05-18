import { AggregatePaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Leaderboard,
  LeaderboardDocument,
} from 'src/schemas/leaderboard.schema';
import { createSearchQuery } from 'src/utils';

@Injectable()
export class LeaderboardsService {
  constructor(
    @InjectModel(Leaderboard.name)
    private leaderboardModel: AggregatePaginateModel<LeaderboardDocument>,
  ) {}

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
        sort: { convertAmount: 'desc' },
      },
    );

    return paginationResult;
  }
}
