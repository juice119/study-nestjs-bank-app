import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AccountDepositWithDrawResponse {
  @Exclude() private readonly _accountId: number;
  @Exclude() private readonly _accountMount: number;
  @Exclude() private readonly _depositMoney: number;

  constructor(accountId: number, accountMount: number, depositMoney: number) {
    this._accountId = accountId;
    this._accountMount = accountMount;
    this._depositMoney = depositMoney;
  }

  static byObject(object) {
    return new AccountDepositWithDrawResponse(
      object.accountId,
      object.accountMount,
      object.depositMoney,
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
  get depositMoney(): number {
    return this._depositMoney;
  }
}
