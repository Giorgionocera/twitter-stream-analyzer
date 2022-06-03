import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationParams } from 'src/dto';
import { AuthorsService } from './authors.service';

@ApiTags('subscriptions')
@Controller('subscriptions')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Get(':limit/:page/:search?')
  async find(@Param() params: PaginationParams) {
    try {
      const authors = await this.authorsService.find(
        Math.abs(params.limit),
        Math.abs(params.page) > 0 ? Math.abs(params.page) : 1,
        params.search,
      );

      return authors;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
