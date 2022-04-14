import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsNotEmpty } from 'class-validator';

export class PaginationParams {
  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'items per page',
    type: Number,
  })
  limit: number;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'page index (start from one)',
    type: Number,
  })
  page: number;
}
