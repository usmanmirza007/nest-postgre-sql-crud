import { Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";

 


@Controller('user')
export class UserController{
    constructor(private userServie: UserService) {}

    @Post('singup')
    signup() {
        return 'i am signed up'
    }

    @Post('signin')
    signin() {
        return 'i am signed in'
    }
}