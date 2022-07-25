import { MainController } from './main.controller';
import { MainService } from './main.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
