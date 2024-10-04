import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Bookmark } from '@prisma/client';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) {}
    
    getBookmarks(userId: number): Promise<Bookmark[]> {
        return this.prisma.bookmark.findMany({
            where: {
                userId: userId
            }
        })
    }

    getBookmarkById(userId: number, bookmarkId: number): Promise<Bookmark> {
        return this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId,
                userId: userId
            }
        })
    }

    createBookmark(userId: number, dto: CreateBookmarkDto) {
        return this.prisma.bookmark.create({
            data: {
                ...dto,
                userId: userId
            }
        })
    }

    async editBookmarkById(userId: number, bookmarkId: number, dto: EditBookmarkDto) {
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                userId: userId, id: bookmarkId
            }
        })

        if (!bookmark || bookmark.userId !== userId) {
            throw new ForbiddenException('Access to resource denied')
        }

        return this.prisma.bookmark.update({
            where: {
                id: bookmarkId
            },
            data: {
                ...dto
            }
        })
    }

    deleteBookmarkById(userId: number, bookmarkId: number) {
        return this.prisma.bookmark.delete({
            where: {
                userId: userId,
                id: bookmarkId
            }
        })
    }
}
