import { FileValidator, Injectable } from "@nestjs/common";

@Injectable()
export class ImageValidator extends FileValidator<{ maxSize: number; allowedMimeTypes: string[] }> {
  constructor(validationOptions: { maxSize: number; allowedMimeTypes: string[] }) {
    super(validationOptions);
  }
  
  isValid(file?: Express.Multer.File): boolean {
    if (!file) {
      return false; // Handle missing files
    }

    const { maxSize, allowedMimeTypes } = this.validationOptions;

    // Check file size
    if (file.size > maxSize) {
      return false;
    }

    // Check MIME type
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return false;
    }

    return true;
  }

  buildErrorMessage(file: any): string {
    if (!file) {
      return 'No file uploaded';
    }

    const { maxSize, allowedMimeTypes } = this.validationOptions;

    if (file.size > maxSize) {
      return `File size exceeds ${maxSize} bytes`;
    }

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return `Invalid file type. Allowed types: ${allowedMimeTypes.join(', ')}`;
    }

    return 'Unknown validation error';
  }
}