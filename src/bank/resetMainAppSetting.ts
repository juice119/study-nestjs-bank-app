import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Reflector } from '@nestjs/core';
import { HttpExceptionFilter } from './util/filter/HttpExceptionFilter';

export function resetMainAppSetting(app: INestApplication) {
  // 1.interceptors
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // 2.pipes
  app.useGlobalPipes(new ValidationPipe());

  // 3.route, then
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('은행 API')
    .addTag('cats')
    .build();
  SwaggerModule.setup(
    'api-docs',
    app,
    SwaggerModule.createDocument(app, config),
  );
}
