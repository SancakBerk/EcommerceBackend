import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Swagger yapılandırması
  const config = new DocumentBuilder()
    .setTitle('E-Ticaret API')
    .setDescription('E-Ticaret platformu için RESTful API')
    .setVersion('1.0')
    .addBearerAuth() // JWT kimlik doğrulaması için
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Uygulama http://localhost:${port} adresinde çalışıyor`);
  console.log(`Swagger UI http://localhost:${port}/api adresinde erişilebilir`);
}
bootstrap();
