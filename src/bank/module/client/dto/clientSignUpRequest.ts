import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ClientSignUpRequest {
  @ApiProperty()
  name: string;
  @ApiProperty()
  @IsEmail()
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
