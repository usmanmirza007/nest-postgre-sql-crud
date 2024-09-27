import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { BookmarkController } from './bookmark/bookmark.controller';
import { BookmarkService } from './bookmark/bookmark.service';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ProductModule } from './product/product.module';
import { DatabaseController } from './database/database.controller';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    PrismaModule,
    BookmarkModule,
    ProductModule,
    DatabaseModule,
    UploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      serveRoot: 'static',
      serveStaticOptions: {index: false}
    })
  ],
  controllers: [BookmarkController, DatabaseController],
  providers: [BookmarkService, DatabaseService],
})
export class AppModule { }
