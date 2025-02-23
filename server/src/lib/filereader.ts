import * as fs from 'fs';

export const readFile = async (filePath: string) => fs.readFileSync(filePath);

export const generateFileName = (image: Express.Multer.File) => {
  const fullImageFile: string | undefined = image ? image?.filename : undefined;

  return fullImageFile;
};
