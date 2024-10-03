import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Product')
@ApiBearerAuth('JWT-auth')
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post()
    create(@Body() createProductDto: Prisma.ProductCreateInput) {
        return this.productService.create(createProductDto)
    }
    
    @Get()
    findAll() {
        return this.productService.findAll()
    }
    
    @Get(':id')
    findOne(@Param() id: number) {
        return this.productService.findOne(id)
    }
    
    @Patch(':id')
    update(@Param() id: number, @Body() updateProductDto: Prisma.ProductUpdateInput) {
        return this.productService.update(id, updateProductDto)
    }
    
    @Delete(':id')
    remove(@Param() id: number) {
        return this.productService.remove(id)
    }
}
