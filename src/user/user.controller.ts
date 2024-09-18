import { Body, Controller, Post, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { Request } from "express";

 


@Controller('user')
export class UserController{
    constructor(private userServie: UserService) {}

    @Post('add')
    signup(@Body() body: any) {
        console.log('body', body);
        
        return 'i am signed up'
    }

    @Post('edit')
    signin() {
        return 'i am signed in'
    }
}