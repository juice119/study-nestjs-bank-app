import { AccountsModule } from '../../util/dataBase/entites/account/AccountsModule';
import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { ClientsModule } from '../../util/dataBase/entites/client/clientsModule';

@Module({
  imports: [AccountsModule, ClientsModule],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
