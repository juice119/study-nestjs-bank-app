import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class ClientLoginRequest {
  @ApiProperty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEmail(
    {},
    {
      message: '올바른 이메일 형식을 사용해주세요.',
    },
  )
  readonly email: string;
  @ApiProperty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MinLength(4, { message: '비밀번호 형식을 확인 해주세요.' })
  @MaxLength(12, { message: '비밀번호 형식을 확인 해주세요.' })
  readonly password: string;
}
