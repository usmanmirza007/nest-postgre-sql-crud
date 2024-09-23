import { NotFoundException,  Injectable, ConflictException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { EditUserDto } from "./dto";

@Injectable({})
export class UserService {
    constructor(private prisma: PrismaService) { }

    async editUser(userId: number, dto: EditUserDto) {

        try {
            const userExsit = await this.prisma.user.findUnique({
                where: {
                    id: userId
                }
            })
    
            if (!userExsit) {
                throw new NotFoundException('User not found')
            }
            if (dto?.email) {
                const userAlreadyExsit = await this.prisma.user.findUnique({
                    where: {
                        email: dto.email
                    }
                })
                
                if (userAlreadyExsit && userAlreadyExsit.id !== userId) {
                    throw new ConflictException('User email already taken');
                }
            }
            
            const user = await this.prisma.user.update({
                where: { id: userExsit.id },
                data: { ...dto }
            })
            delete user.hash
            return user
        } catch (error) {
            throw error
            console.log('err', error?.response?.statusCode);
            // if (error?.response && error?.response?.statusCode == 409) {
            //     throw new ConflictException('User email already taken');
            // }
            
        }
    }
}