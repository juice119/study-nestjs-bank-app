import { Module } from '@nestjs/common';
import { MainModule } from './module/main/main.module';

@Module({
  imports: [MainModule],
})
export class MainAppModule {}
