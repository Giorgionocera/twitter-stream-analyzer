import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { LeaderboardsService } from './leaderboards.service';
import { BitsongService } from 'src/bitsong/bitsong.service';
import { lastValueFrom, tap } from 'rxjs';
import { searchTransferAddresses } from 'src/utils';

@Injectable()
export class LeaderboardsCommand {
  constructor(
    private readonly leaderboardsService: LeaderboardsService,
    private readonly bitsongService: BitsongService,
  ) {}

  @Command({
    command: 'leaderboards:search-disqualified',
    describe:
      'Search for disqualified address and update them inside the leaderboard',
  })
  async searchDisqualifiedUsers() {
    try {
      console.log('Searching for disqualified users...');

      const txs = await lastValueFrom(this.bitsongService.getAllTxs());
      const bannedAddresses = searchTransferAddresses(txs);

      await this.leaderboardsService.updateDisqualified(bannedAddresses);

      console.log(bannedAddresses.length);
    } catch (error) {
      console.error(error);
    }
  }
}
