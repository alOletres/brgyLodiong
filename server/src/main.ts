import { SwaggerModule } from '@nestjs/swagger';
import { createApplication, createSwaggerDocument } from './application.config';
import { INestApplication } from '@nestjs/common';
import { writeFile } from 'fs/promises';
let app: INestApplication;
async function bootstrap() {
  app = await createApplication();

  const document = createSwaggerDocument(app);
  await writeFile('./swagger.json', JSON.stringify(document, null, '  '));

  SwaggerModule.setup('api/swagger', app, document);
  await app.listen(3000);
}
bootstrap();
