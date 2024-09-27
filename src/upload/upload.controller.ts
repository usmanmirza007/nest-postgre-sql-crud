import { BadRequestException, Controller, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter, ImageValidator } from './validator';
import { GetUser } from '../auth/decorator';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
    constructor(
        private uploadService: UploadService,
        private readonly imageValidator: ImageValidator
    ) { }
    
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
                new MaxFileSizeValidator({ maxSize: 30000 }),
            ]
        })
    ) file: Express.Multer.File, @GetUser('id') userId: number) {
        if (!this.imageValidator.isValid(file)) {
            throw new BadRequestException(this.imageValidator.buildErrorMessage(file));
        }
        this.uploadService.uploadFile(file, userId)
    }

}
