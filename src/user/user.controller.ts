import { Body, Controller, Get, Injectable, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtGuard } from "../auth/guard";
import { GetUser } from "../auth/decorator";
import { User } from "@prisma/client";

 
@Controller('user')
export class UserController{
    constructor(private userServie: UserService) {}

    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser() user: User) {
        console.log('body', );
        
        return user
    }

    @Post('edit')
    signin() {
        return 'i am signed in'
    }
}