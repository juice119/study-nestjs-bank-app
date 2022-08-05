import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class AccountDepositWithDrawParamsRequest {
  @ApiProperty()
  @Transform(({ value }) =>
    typeof value === 'string' ? parseInt(value) : value,
  )
  @IsNumber()
  @Min(1)
  readonly accountId: number;
}
