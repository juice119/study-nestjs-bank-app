import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AccountWithDrawResponse {
  @Exclude() private readonly _accountId: number;
  @Exclude() private readonly _accountMount: number;
  @Exclude() private readonly _withdrawMoney: number;

  constructor(accountId: number, accountMount: number, withdrawMoney: number) {
    this._accountId = accountId;
    this._accountMount = accountMount;
    this._withdrawMoney = withdrawMoney;
  }

  static byObject(object) {
    return new AccountWithDrawResponse(
      object.accountId,
      object.accountMount,
      object.withdrawMoney,
    );
  }

  @Expose()
  @ApiProperty()
  get accountId(): number {
    return this._accountId;
  }

  @Expose()
  @ApiProperty()
  get accountMount(): number {
    return this._accountMount;
  }

  @Expose()
  @ApiProperty()
  get withdrawMoney(): number {
    return this._withdrawMoney;
  }
}
