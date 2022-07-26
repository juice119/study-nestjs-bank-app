import { INestApplication, ValidationPipe } from '@nestjs/common';

export function resetMainAppSetting(app: INestApplication) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  app.useGlobalFilters(new ValidationPipe());
}
