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
      console.log(params);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
