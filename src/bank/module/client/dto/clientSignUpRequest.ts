import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class ClientSignUpRequest {
  @ApiProperty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MinLength(1, { message: '최소 1글자 이상으로 입력해주세요.' })
  @MaxLength(25, { message: '최대 25글자 이하로 입력해주세요.' })
  name: string;

  @ApiProperty()
  @IsEmail(
    {},
    {
      message: '올바른 이메일 형식을 사용해주세요.',
    },
  )
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
