import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Reflector } from '@nestjs/core';
import { HttpExceptionFilter } from './filter/HttpExceptionFilter';
import { ValidationError } from 'class-validator';
import { ValidationException } from './exception/ValidationException';
import { BankAppResponseInterceptor } from './interceptor/BankAppResponseInterceptor';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

export function resetMainAppSetting(app: NestExpressApplication) {
  // 1.interceptors
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new BankAppResponseInterceptor());

  // 2.pipes
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) =>
        new ValidationException(errors),
    }),
  );

  // 3.route, then
  app.useGlobalFilters(new HttpExceptionFilter());

  // viewEngine Setting
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

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
