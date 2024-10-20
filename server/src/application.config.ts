import { INestApplication } from '@nestjs/common';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { setGlobalSetting } from './global.settings';

export const createStandaloneApplication = async (
  options: NestApplicationContextOptions,
) => {
  const app = await NestFactory.createApplicationContext(AppModule, options);

  return app;
};

export const createApplication = async (
  options: NestApplicationContextOptions = {},
) => {
  const app = await NestFactory.create(AppModule, options);
  setGlobalSetting(app);

  return app;
};

export function createSwaggerDocument(app: INestApplication): OpenAPIObject {
  const config = new DocumentBuilder()
    .setTitle('Brgy Lodiong Document Request APIs documents')
    .build();
  return SwaggerModule.createDocument(app, config);
}
