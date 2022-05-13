import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Leaderboard,
  LeaderboardDocument,
} from 'src/schemas/leaderboard.schema';

@Injectable()
export class LeaderboardsService {
  private readonly logger = new Logger(LeaderboardsService.name);

  constructor(
    @InjectModel(Leaderboard.name)
    private leaderboardModel: Model<LeaderboardDocument>,
  ) {}
}
