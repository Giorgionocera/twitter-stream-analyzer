import { PaginateModel } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserV2 } from 'twitter-api-v2';
import { Author, AuthorDocument } from 'src/schemas/author.schema';
import { mapAuthor } from 'src/utils';

@Injectable()
export class AuthorsService {
  private readonly logger = new Logger(AuthorsService.name);

  constructor(
    @InjectModel(Author.name)
    private authorModel: PaginateModel<AuthorDocument>,
  ) {}

  async createOrUpdate(
    authorRaw: UserV2,
    bitsongAddress: string,
  ): Promise<string> {
    const author: Author = mapAuthor(authorRaw, bitsongAddress);

    try {
      const oldAuthorModel = await this.authorModel.findOneAndUpdate(
        { authorId: author.authorId },
        { address: author.address },
        { new: true },
      );

      return oldAuthorModel._id.toString();
    } catch (error) {
      this.logger.verbose("Author doesn't exist, creating...");

      const authorModel = await new this.authorModel(author).save();

      return authorModel._id.toString();
    }
  }

  async find(limit = 10, page = 0) {
    return await this.authorModel.paginate(undefined, {
      limit,
      page,
    });
  }

  async findAll() {
    return await this.authorModel.paginate(undefined, {
      pagination: false,
    });
  }
}
