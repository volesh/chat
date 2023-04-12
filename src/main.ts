import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { envsConfig } from './general/configs/envs.config';
import { IsUuidValidPipe } from './general/pipes/id.validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(new IsUuidValidPipe());

  const config = new DocumentBuilder()
    .setTitle('Chat')
    .setDescription('The chat API description')
    .setVersion('1.0')
    .addTag('chat')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  await app.listen(+envsConfig.port);
}
bootstrap();
