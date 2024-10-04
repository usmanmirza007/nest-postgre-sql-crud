import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma } from '@prisma/client';
import { ApiBearerAuth, ApiOkResponse, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateProductDto, EditProductDto, GetProductDto } from './dto';
@ApiTags('Product')
@ApiBearerAuth('JWT-auth')
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto)
    }
    
    @Get()
    @ApiOkResponse({
        description: 'Array of product',
        type: [GetProductDto],
    })
    findAll() {
        return this.productService.findAll()
    }
    
    @Get(':id')
    @ApiOkResponse({
        description: 'Object of bookmarks',
        type: GetProductDto,
    })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productService.findOne(id)
    }
    
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: EditProductDto) {
        return this.productService.update(id, updateProductDto)
    }
    
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.productService.remove(id)
    }
}
