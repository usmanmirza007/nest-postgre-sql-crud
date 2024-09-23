import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ProductService {
    constructor(
        private readonly database: DatabaseService
    ) {}

    create(createProductDto: Prisma.ProductCreateInput) {
        return this.database.product.create({
            data: {
                ...createProductDto
            }
        })
    }

    findOne(id: number) {
        return this.database.product.findUnique({
            where: {
                id: id
            }
        })
    }
    
    findAll() {
        return this.database.product.findMany()
    }
    
    update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
        return this.database.product.update({
            where: {
                id: id
            },
            data: {
                ...updateProductDto
            }
        })
    }
    
    remove(id: number) {
        return this.database.product.delete({
            where: {
                id: id
            }
        })
    }
}
