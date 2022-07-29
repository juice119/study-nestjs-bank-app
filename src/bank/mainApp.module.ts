import { Module } from '@nestjs/common';
import { MainModule } from './module/main/main.module';
import { getDataBaseConnection } from './util/dataBase/dataBaseConnection/getDataBaseConnection';
import { ClientModule } from './module/client/client.module';

@Module({
  imports: [getDataBaseConnection(), MainModule, ClientModule],
})
export class MainAppModule {}
