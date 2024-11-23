import * as fs from 'fs';
import { join } from 'path';

export const readFile = async (filePath: string) => fs.readFileSync(filePath);

export const generateImagePath = (image: Express.Multer.File) => {
  const imageFullPath = join(process.cwd(), 'uploads');
  const fullImagePath: string | undefined = image
    ? join(imageFullPath + '/' + image?.filename)
    : undefined;
  return fullImagePath;
};
