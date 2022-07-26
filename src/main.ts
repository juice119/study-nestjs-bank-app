import { NestFactory } from '@nestjs/core';
import { MainAppModule } from './app/mainApp.module';

async function bootstrap() {
  const app = await NestFactory.create(MainAppModule);
  await app.listen(8000);
}
bootstrap();
