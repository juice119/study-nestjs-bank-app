import { AccountDepositWithDrawRequest } from './AccountDepositWithDrawRequest';
import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccountDepositBodyRequest
  implements AccountDepositWithDrawRequest
{
  @ApiProperty()
  @IsNumber()
  @Min(10, { message: '최소 10원 단위로 입금 할 수 있습니다' })
  readonly depositMoney: number;
}
