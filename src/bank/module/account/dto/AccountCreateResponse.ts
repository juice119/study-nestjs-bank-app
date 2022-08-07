import { ApiProperty } from '@nestjs/swagger';
import { Account } from '../../../util/dataBase/entites/account/Account.entity';
import { Exclude, Expose } from 'class-transformer';

export class AccountCreateResponse {
  @Exclude()
  private readonly _accountId: number;
  @Exclude()
  private readonly _purposeDescription: string;

  constructor(accountId: number, purposeDescription: string) {
    this._accountId = accountId;
    this._purposeDescription = purposeDescription;
  }

  static byAccount(account: Account) {
    return new AccountCreateResponse(account.id, account.purposeDescription);
  }

  static byObject({ accountId, purposeDescription }) {
    return new AccountCreateResponse(accountId, purposeDescription);
  }

  @Expose()
  @ApiProperty()
  get accountId(): number {
    return this._accountId;
  }

  @Expose()
  @ApiProperty()
  get purposeDescription(): string {
    return this._purposeDescription;
  }
}
