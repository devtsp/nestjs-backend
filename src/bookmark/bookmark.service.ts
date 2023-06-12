import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prismaService: PrismaService) {}

  getBookmarks(userId: number) {
    return this.prismaService.bookmark.findMany({
      where: { userId },
    });
  }

  getBookmarkById(userId: number, bookmarkId: number) {}

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prismaService.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });

    return bookmark;
  }

  editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {}

  deleteBookmarkById(userId: number, bookmarkId: number) {}
}
