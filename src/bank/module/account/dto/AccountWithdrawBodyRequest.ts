import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { ValidateWithDrawMoney } from '../../../util/validationDecorators/ValidateWithdrawMoney';

export class AccountWithdrawBodyRequest {
  @ApiProperty()
  @IsNumber()
  @ValidateWithDrawMoney()
  withdrawMoney: number;

  constructor(withdrawMoney: number) {
    this.withdrawMoney = withdrawMoney;
  }
}
