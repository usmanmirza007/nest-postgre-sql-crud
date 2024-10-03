import { BadRequestException, Controller, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter, ImageValidator } from './validator';
import { GetUser } from '../auth/decorator';
import { UploadService } from './upload.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Upload')
@ApiBearerAuth('JWT-auth')
@Controller('upload')
export class UploadController {
    constructor(
        private uploadService: UploadService,
        private readonly imageValidator: ImageValidator
    ) { }

    @Post('file')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './file',
            filename: editFileName
        }),
        fileFilter: imageFileFilter
    }))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary', // File type in Swagger
                },
            },
        },
    })
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

    @Post('files')
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: 'avatar', maxCount: 1 },
            { name: 'background', maxCount: 1 }
        ],
        {
            storage: diskStorage({
                destination: './file',
                filename: editFileName
            }),
            fileFilter: imageFileFilter
        }
    ))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                avatar: {
                    type: 'string',
                    format: 'binary',
                },
                background: {
                    type: 'string',
                    format: 'binary',
                },
                // background: {
                //     type: 'array',       // for array of images upload
                //     items: {
                //         type: 'string',
                //         format: 'binary',
                //     },
                // },
            },
        },
    })
    uploadMultipleFiles(@UploadedFiles() files: { avatar?: Express.Multer.File, background?: Express.Multer.File }, @GetUser('id') userId: number) {
        console.log(files);

        const validateFiles = (fileArray?: Express.Multer.File) => {
            if (!this.imageValidator.isValid(fileArray)) {
                throw new BadRequestException(this.imageValidator.buildErrorMessage(fileArray));
            }
        };
        validateFiles(files.avatar);
        validateFiles(files.background);

        this.uploadService.uploadMultipleFiles(files, userId)
    }

}
