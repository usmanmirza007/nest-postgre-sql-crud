import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { CreateProductDto, EditProductDto } from './dto';

@Injectable()
export class ProductService {
    constructor(
        private readonly database: DatabaseService
    ) {}

    create(createProductDto: CreateProductDto) {
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
    
    update(id: number, updateProductDto: EditProductDto) {
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
