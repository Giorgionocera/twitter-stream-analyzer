import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { SnapshotsService } from './snapshots.service';
import { readFileSync } from 'fs';
import { Bank } from 'src/schemas/bank.schema';

@Injectable()
export class SnapshotsCommand {
  constructor(private readonly snapshotsService: SnapshotsService) {}

  @Command({
    command: 'snapshot:import <bank>',
    describe: 'Import a bank snapshot',
  })
  async create(
    @Positional({
      name: 'bank',
      describe: 'bank file path',
      type: 'string',
    })
    bankFilePath: string,
  ) {
    try {
      const file = await readFileSync(bankFilePath, 'utf-8');
      const banks = JSON.parse(file) as Bank[];

      console.log(`file: ${bankFilePath} read`);

      const snapshotId = await this.snapshotsService.createSnapshot(banks);

      console.log(snapshotId);
    } catch (error) {
      console.error(error);
    }
  }
}
