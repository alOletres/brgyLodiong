/// <reference types="node" />
/// <reference types="express-serve-static-core" />
/// <reference types="passport" />
/// <reference types="compression" />
/// <reference types="multer" />
export declare const readFile: (filePath: string) => Promise<Buffer>;
export declare const generateImagePath: (image: Express.Multer.File) => string;
