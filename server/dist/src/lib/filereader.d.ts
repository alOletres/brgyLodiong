/// <reference types="node" />
/// <reference types="express-serve-static-core" />
/// <reference types="passport" />
/// <reference types="multer" />
/// <reference types="compression" />
export declare const readFile: (filePath: string) => Promise<Buffer>;
export declare const generateFileName: (image: Express.Multer.File) => string;
