import { AccountsModule } from '../../util/dataBase/entites/account/AccountsModule';
import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { ClientsModule } from '../../util/dataBase/entites/client/clientsModule';
import { AccountStatementsModule } from '../../util/dataBase/entites/AccountStatement/AccountStatementsModule';
import { AccountReadRepository } from './accountReadRepository';

@Module({
  imports: [AccountsModule, ClientsModule, AccountStatementsModule],
  providers: [AccountService, AccountReadRepository],
  controllers: [AccountController],
})
export class AccountModule {}
