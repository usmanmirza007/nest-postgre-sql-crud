import { Controller, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './validator';
import { GetUser } from 'src/auth/decorator';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
    constructor(
        private uploadService: UploadService,
    ) {}
    
    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './file',
            filename: editFileName
        }),
        fileFilter: imageFileFilter
    }))

    uploadFile(@UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({maxSize: 30000}),
            ]
        })
    ) file: Express.Multer.File, @GetUser('id') userId: number) {
        
        this.uploadService.uploadFile(file, userId)
    }
}
