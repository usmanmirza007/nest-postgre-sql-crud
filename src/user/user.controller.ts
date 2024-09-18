import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { Request } from "express";
import { AuthGuard } from "@nestjs/passport";

 


@Controller('user')
export class UserController{
    constructor(private userServie: UserService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe(@Req() req: Request) {
        console.log('body', );
        
        return req.user
    }

    @Post('edit')
    signin() {
        return 'i am signed in'
    }
}