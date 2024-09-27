import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadService {
    constructor(private prisma: PrismaService) {}
    

    async uploadFile(file: Express.Multer.File, userId: number) {

        const userExsit = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!userExsit) {
            throw new NotFoundException('User not found')
        }

        this.prisma.user.update({
            where: {
                id: userExsit.id
            },
            data: {
                ...userExsit,
                picture: file.filename.toString()
            }
        })
    }
}
