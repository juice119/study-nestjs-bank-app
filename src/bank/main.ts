import { NestFactory } from '@nestjs/core';
import { MainAppModule } from './mainApp.module';
import { resetMainAppSetting } from './resetMainAppSetting';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainAppModule);

  resetMainAppSetting(app);
  await app.listen(8000);
}
bootstrap();
