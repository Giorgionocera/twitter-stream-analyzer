import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { AuthorsService } from './authors.service';

@Controller('subscriptions')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Get(':limit/:page')
  async findAll(@Param('limit') limit: string, @Param('page') page: string) {
    try {
      const authors = await this.authorsService.find(
        parseInt(limit, 10),
        parseInt(page, 10),
      );

      return authors;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
