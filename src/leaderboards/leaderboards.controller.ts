import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationParams } from 'src/dto';
import { LeaderboardsService } from './leaderboards.service';

@ApiTags('leaderboards')
@Controller('leaderboards')
export class LeaderboardsController {
  constructor(private leaderboardsService: LeaderboardsService) {}

  @Get(':limit/:page/:search?')
  async find(@Param() params: PaginationParams) {
    try {
      const leaderboard = await this.leaderboardsService.find(
        Math.abs(params.limit),
        Math.abs(params.page),
        params.search,
      );

      return leaderboard;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
