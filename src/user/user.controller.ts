import { Body, Controller, Get, Injectable, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtGuard } from "../auth/guard";
import { GetUser } from "../auth/decorator";
import { User } from "@prisma/client";
import { EditUserDto } from "./dto";

 
@Controller('users')
export class UserController{
    constructor(private userServie: UserService) {}

    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser() user: User) {
        console.log('body', );
        
        return user
    }

    @Patch('edit')
    editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
        return this.userServie.editUser(userId, dto)
    }
}