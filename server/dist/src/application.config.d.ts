import { INestApplication } from '@nestjs/common';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { OpenAPIObject } from '@nestjs/swagger';
export declare const createStandaloneApplication: (options: NestApplicationContextOptions) => Promise<import("@nestjs/common").INestApplicationContext>;
export declare const createApplication: (options?: NestApplicationContextOptions) => Promise<INestApplication>;
export declare function createSwaggerDocument(app: INestApplication): OpenAPIObject;
