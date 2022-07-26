import { NestFactory } from '@nestjs/core';
import { MainAppModule } from './mainApp.module';
import { resetMainAppSetting } from './resetMainAppSetting';

async function bootstrap() {
  const app = await NestFactory.create(MainAppModule);
  resetMainAppSetting(app);
  await app.listen(8000);
}
bootstrap();
