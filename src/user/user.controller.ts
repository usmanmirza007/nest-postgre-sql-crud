import { Body, Controller, Get, Injectable, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtGuard } from "../auth/guard";
import { GetUser } from "../auth/decorator";
import { User } from "@prisma/client";
import { EditUserDto } from "./dto";


@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userServie: UserService) { }

    @Get('me')
    getMe(@GetUser() user: User) {
        return user
    }

    @Patch('edit')
    editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
        return this.userServie.editUser(userId, dto)
    }
}