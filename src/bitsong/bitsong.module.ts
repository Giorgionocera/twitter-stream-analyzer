import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BitsongService } from './bitsong.service';

@Module({
  imports: [HttpModule],
  providers: [BitsongService],
  exports: [BitsongService],
})
export class BitsongModule {}
