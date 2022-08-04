import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AccountCreateRequest {
  @ApiProperty()
  @IsEmail()
  clientEmail: string;

  @ApiProperty()
  @IsString()
  purposeDescription: string;

  constructor(clientEmail: string, purposeDescription: string) {
    this.clientEmail = clientEmail;
    this.purposeDescription = purposeDescription;
  }
}
