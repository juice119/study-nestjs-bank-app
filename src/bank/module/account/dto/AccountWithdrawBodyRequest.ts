import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AccountWithdrawBodyRequest {
  @ApiProperty()
  @IsNumber()
  withdrawMoney: number;

  constructor(withdrawMoney: number) {
    this.withdrawMoney = withdrawMoney;
  }
}
