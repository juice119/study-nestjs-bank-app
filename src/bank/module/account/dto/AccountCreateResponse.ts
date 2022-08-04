import { ApiProperty } from '@nestjs/swagger';
import { Account } from '../../../util/dataBase/entites/account/Account.entity';

export class AccountCreateResponse {
  @ApiProperty()
  accountId: number;

  @ApiProperty()
  purposeDescription: string;

  constructor(accountId: number, purposeDescription: string) {
    this.accountId = accountId;
    this.purposeDescription = purposeDescription;
  }

  static byAccount(account: Account) {
    return new AccountCreateResponse(account.id, account.purposeDescription);
  }
}
