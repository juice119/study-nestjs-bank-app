import { Module } from '@nestjs/common';
import { MainModule } from './module/main/main.module';
import { getDataBaseConnection } from '../util/dataBase/dataBaseConnection/getDataBaseConnection';

@Module({
  imports: [getDataBaseConnection(), MainModule],
})
export class MainAppModule {}
