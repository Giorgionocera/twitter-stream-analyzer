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

  @Get()
  async findAll() {
    try {
      const authors = await this.authorsService.findAll();

      return authors;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get(':limit/:page')
  async find(@Param() params: PaginationParams) {
    try {
      const authors = await this.authorsService.find(params.limit, params.page);

      return authors;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
