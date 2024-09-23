import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from '../prisma/prisma.service';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, DatabaseService],
})
export class ProductModule {}
