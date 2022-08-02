import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ClientsModule } from '../../util/dataBase/entites/client/clientsModule';

@Module({
  imports: [ClientsModule],
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
