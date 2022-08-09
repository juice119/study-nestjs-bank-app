import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccountDepositBodyRequest {
  @ApiProperty()
  @IsNumber()
  @Min(10, { message: '최소 10원 단위로 입금 할 수 있습니다' })
  readonly depositMoney: number;

  constructor(depositMoney: number) {
    this.depositMoney = depositMoney;
  }
}
