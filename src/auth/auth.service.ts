import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }
    async signup(dto: AuthDto) {

        try {
            console.log('fofof', dto);
            
            const hash = await argon.hash(dto.password)
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash
                }
            })
            delete user.hash
            return user
        } catch (error) {
            console.log('err', error);
            
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ForbiddenException('Credentails taken')
            }
            console.log('err', error);

            throw error
        }
    }

    signin() {
        return { login: true }
    }
}
