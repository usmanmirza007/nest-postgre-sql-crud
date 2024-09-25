import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImageValidator } from './validator';

@Module({
  imports: [],
  providers: [UploadService, PrismaService, 
    // ImageValidator
    {
    provide: ImageValidator,
    useFactory: () => {
      const validationOptions = {
        maxSize: 1024 * 1024, // 1 MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/jpeg'],
      };
      return new ImageValidator(validationOptions);
    }
  }
],
  controllers: [UploadController],
})
export class UploadModule {}
