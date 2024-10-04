import { Body, Controller, Get, Injectable, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtGuard } from "../auth/guard";
import { GetUser } from "../auth/decorator";
import { User } from "@prisma/client";
import { EditUserDto, GetUserDto } from "./dto";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";


@UseGuards(JwtGuard)
@ApiTags('User')
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UserController {
    constructor(private userServie: UserService) { }

    @Get('me')
    @ApiOkResponse({
        description: 'Object of user',
        type: GetUserDto,
    })
    getMe(@GetUser() user: User) {
        return user
    }

    @Patch('edit')
    editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
        return this.userServie.editUser(userId, dto)
    }
}