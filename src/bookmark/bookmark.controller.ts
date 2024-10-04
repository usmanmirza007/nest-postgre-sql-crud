import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorator';
import { CreateBookmarkDto, EditBookmarkDto, GetBookmarkDto } from './dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Bookmark } from "@prisma/client"


@UseGuards(JwtGuard)
@ApiTags('Bookmark')
@ApiBearerAuth('JWT-auth')
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) { }

    @Get()
    @ApiOkResponse({
        description: 'Array of bookmarks',
        type: [GetBookmarkDto],
    })
    getBookmarks(@GetUser('id') userId: number): Promise<Bookmark[]> {
        return this.bookmarkService.getBookmarks(userId)
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'Array of bookmarks',
        type: GetBookmarkDto,
    })
    getBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number): Promise<Bookmark> {
        return this.bookmarkService.getBookmarkById(userId, bookmarkId)
    }

    @Post()
    createBookmark(@GetUser('id') userId: number, @Body() dto: CreateBookmarkDto) {
        return this.bookmarkService.createBookmark(userId, dto)
    }

    @Patch(':id')
    editBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number, @Body() dto: EditBookmarkDto) {
        return this.bookmarkService.editBookmarkById(userId, bookmarkId, dto)
    }

    @Delete(':id')
    deleteBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {
        return this.bookmarkService.deleteBookmarkById(userId, bookmarkId)
    }

}
