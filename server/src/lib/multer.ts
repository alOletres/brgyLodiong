import { HttpException, HttpStatus } from '@nestjs/common';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

enum EValidFileExtension {
  PNG = 'png',
  JPG = 'jpg',
  JPEG = 'jpeg',
}

enum EValidMimeType {
  IMAGE_PNG = 'image/png',
  IMAGE_JPG = 'image/jpg',
  IMAGE_JPEG = 'image/jpeg',
  APPLICATION_SPREADSHEET = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  APPLICATION_VND = 'application/vnd.ms-excel',
}

type validFileExtension = `${EValidFileExtension}`;
type validMimeType = `${EValidMimeType}`;

// Valid File Extension
const validFileExtension: validFileExtension[] =
  Object.values(EValidFileExtension);
// Valid Mime Type
const validMimeType: validMimeType[] = Object.values(EValidMimeType);

export const storage = diskStorage({
  // destination: './uploads',
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    const filename = `${uniqueSuffix}${ext}`;
    callback(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes: validMimeType[] = validMimeType;
  allowedMimeTypes.includes(file.mimetype as validMimeType)
    ? cb(null, true)
    : cb(
        new HttpException(
          'File must be a png, jpg/jpeg, or excel file',
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
};

const limits = {
  fileSize: 10000000, // 10MB
  // 5 * 1024 * 1024
};

export const multerOption: MulterModuleOptions = {
  storage,
  limits,
  fileFilter,
};
