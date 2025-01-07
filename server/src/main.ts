import { SwaggerModule } from '@nestjs/swagger';
import { createApplication, createSwaggerDocument } from './application.config';
import { INestApplication } from '@nestjs/common';
import { writeFile } from 'fs/promises';
let app: INestApplication;
async function bootstrap() {
  app = await createApplication();

  // Explicitly add CORS headers
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );
    next();
  });

  const document = createSwaggerDocument(app);
  await writeFile('./swagger.json', JSON.stringify(document, null, '  '));

  SwaggerModule.setup('api/swagger', app, document);
  await app.listen(4000);
}
bootstrap();
